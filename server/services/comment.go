package services

import (
	cst "github.com/qingyggg/storybook/server/constants"
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"golang.org/x/exp/slices"
	"gorm.io/gorm"
)

type Comment struct {
	DB *gorm.DB
}

func (c *Comment) List(ad uint) (bool, *models.ApiComments) {
	return c.baseList("list", ad)
}

func (c *Comment) MyList(ud uint) (bool, *models.ApiComments) {
	return c.baseList("mylist", ud)
}

func (c *Comment) baseList(forWhat string, payload uint) (bool, *models.ApiComments) {
	ds := new(util.DbRes)
	comments := &models.ApiComments{}
	semiSqlClause := c.DB.Table("comments").Select("comments.id, comments.content,user_profiles.name user_name,user_profiles.user_id").Joins("left join user_profiles  on user_profiles.user_id = comments.user_id")
	var result *gorm.DB
	if forWhat == "mylist" {
		result = semiSqlClause.Where("user_profiles.user_id = ?", payload).Scan(comments)
	} else {
		//for list
		result = semiSqlClause.Where("article_id = ?", payload).Scan(comments)
	}
	isSqlErr := ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).GetIsErr()
	return isSqlErr, comments
}

func (c *Comment) Create(commentDto *dto.CommentDtoForCreate) bool {
	comment := &models.Comment{
		UserID:    commentDto.UserID,
		ArticleID: commentDto.ArticleID,
		Content:   commentDto.Content,
	}
	result := c.DB.Create(comment)
	return util.CrudJudgement(result)
}

// Delete jwt-->article owner,comment user
func (c *Comment) Delete(commentDto *dto.CommentDtoForDelete) bool {
	comment := &models.Comment{
		ID: commentDto.ID,
	}
	result := c.DB.Unscoped().Delete(comment)
	return util.CrudJudgement(result)
}

// jwt-->comment user
func (c *Comment) Edit(commentDto *dto.CommentDtoForEdit) bool {
	comment := &models.Comment{
		ID:        commentDto.ID,
		UserID:    commentDto.UserID,
		ArticleID: commentDto.ArticleID,
		Content:   commentDto.Content,
	}
	// 根据 `struct` 更新属性，只会更新非零值的字段
	result := c.DB.Model(&models.Comment{ID: comment.ID}).Updates(comment)
	return util.CrudJudgement(result)
}

func (c *Comment) LikeStatusShow(likeDto *dto.LikeDto) (ok bool, isLike bool) {
	like := &models.Like{
		ArticleID: likeDto.ArticleID,
		UserID:    likeDto.UserID,
	}
	var like2 *models.Like
	ok = util.CrudJudgement(c.DB.Where(like).Find(like2))
	//current user like status
	if like2.ID == like.ID {
		isLike = true
	} else {
		isLike = false
	}
	return
}

func (c *Comment) Like(likeDto *dto.LikeDto) bool {
	like := &models.Like{
		ArticleID: likeDto.ArticleID,
		UserID:    likeDto.UserID,
	}
	result := c.DB.Create(like)
	return util.CrudJudgement(result)
}

func (c *Comment) DisLike(likeDto *dto.LikeDto) bool {
	like := &models.Like{
		ArticleID: likeDto.ArticleID,
		UserID:    likeDto.UserID,
	}
	result := c.DB.Delete(like)
	return util.CrudJudgement(result)
}

func (c *Comment) LikeNumberModify(articleID uint, signal string) bool {
	var payload *models.ApiArticleLikesAndCommentsAmount
	results := c.DB.Where(&models.Article{ID: articleID}).Find(&payload)
	if util.CrudJudgement(results) {
		if signal == "add" {
			payload.LikeNumber += 1
		} else if signal == "delete" {
			payload.LikeNumber -= 1
		}
		results2 := c.DB.Model(&models.Article{ID: articleID}).Updates(payload)
		return util.CrudJudgement(results2)
	} else {
		return false
	}
}

func (c *Comment) CommentNumberModify(articleID uint, signal string) bool {
	payload := &models.Article{
		ID: articleID,
	}
	results := c.DB.Model(payload).First(&payload)
	if util.CrudJudgement(results) {
		if signal == "add" {
			payload.CommentNumber += 1
		} else if signal == "delete" {
			payload.CommentNumber -= 1
		}
		results2 := c.DB.Save(payload)
		return util.CrudJudgement(results2)
	} else {
		return false
	}
}

func (c *Comment) LikeShow(likeDto *dto.LikeDto) (bool, string) {
	ds := new(util.DbRes)
	like := &models.Like{
		ArticleID: likeDto.ArticleID,
		UserID:    likeDto.UserID,
	}
	result := c.DB.Model(&models.Like{}).Where(like).First(&models.Like{})
	return ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).AssignMessage([]string{cst.LIKE_RECORD, cst.LIKE_NO_RECORD}).ReturnInfo()
}

func (c *Comment) LikesShow(likesDto *dto.LikesDto) (bool, []bool) {
	ds := new(util.DbRes)
	likes := &models.Likes{}
	adList := getLikesArticleId(likesDto)
	result := c.DB.Model(&models.Like{}).Where("article_id IN ?", adList).Find(likes)
	errTInSql := ds.AssignResults(result).DistinguishSqlErrType().GetErrType()
	if errTInSql == 0 {
		err, _ := ds.AssignMessage([]string{}).ReturnInfo()
		return err, nil
	} else if errTInSql == 1 {
		return false, reconcileBoolList(likes, adList)
	} else {
		return false, []bool{}
	}
}
func getLikesArticleId(likesDto *dto.LikesDto) []uint {
	var adArr []uint
	for _, v := range *likesDto {
		adArr = append(adArr, v.ArticleID)
	}
	return adArr
}
func reconcileBoolList(ls *models.Likes, adList []uint) []bool {
	var lsArr []uint
	var boolArr []bool
	for _, v := range *ls {
		lsArr = append(lsArr, v.ArticleID)
	}
	for _, v := range adList {
		if idx := slices.Index(lsArr, v); idx != -1 {
			boolArr = append(boolArr, true)
		} else {
			boolArr = append(boolArr, false)
		}
	}
	return boolArr
}
