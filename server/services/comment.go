package services

import (
	"errors"

	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Comment struct {
	DB *gorm.DB
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

// jwt-->article owner,comment user
func (c *Comment) Delete(commentDto *dto.CommentDtoForDelete) bool {
	comment := &models.Comment{
		ID: commentDto.ID,
	}
	result := c.DB.Delete(comment)
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

func (c *Comment) Like(likeDto *dto.LikeDto) bool {
	like := &models.Like{
		ArticleID: likeDto.ArticleID,
		UserID:    likeDto.UserID,
	}
	result := c.DB.Create(like)
	return util.CrudJudgement(result)
}

func (c *Comment) DisLike(disLikeDto *dto.DisLikeDto) bool {
	disLike := &models.Like{
		ID: disLikeDto.ID,
	}
	result := c.DB.Delete(disLike)
	return util.CrudJudgement(result)
}

// if true,dislike it,if false,like it
func (c *Comment) LikeJudgement(likeDto *dto.LikeDto) (has int, RecordId uint) {
	likeForCondition := &models.Like{
		ArticleID: likeDto.ArticleID,
		UserID:    likeDto.UserID,
	}
	like := &models.Like{}
	//if like exists
	result := c.DB.Where(likeForCondition).Find(like)
	if result.Error!=nil{
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			//has no record
			has = 0
		} else{
			has=-1
		}
	}else {
		//has record
		has = 1
		RecordId = like.ID
	}
	return
}
