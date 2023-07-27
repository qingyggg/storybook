package services

import (
	"fmt"
	cst "github.com/qingyggg/storybook/server/constants"
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Article struct {
	DB *gorm.DB
}

func (a *Article) Count() (bool, int64) {
	ds := new(util.DbRes)
	var count int64
	result := a.DB.Model(&models.Article{}).Count(&count)
	isErr, _ := ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).ReturnInfo()
	return isErr, count
}

// List TODO: label,keyword will add later=
func (a *Article) List(offset uint) (bool, *models.ApiArticleList) {
	ds := new(util.DbRes)
	//NOTE: except title,description field,other field will be returned zero value
	articles := new(models.ApiArticleList)
	result := a.DB.Model(&models.Article{}).Limit(15).Offset(int(offset)).Find(articles)
	isErr, _ := ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).ReturnInfo()
	return isErr, articles
}

func (a *Article) MyList(uid uint) (bool, *models.ApiArticleList) {
	ds := new(util.DbRes)
	//NOTE: except title,description field,other field will be returned zero value
	articles := new(models.ApiArticleList)
	result := a.DB.Model(&models.Article{}).Where("user_id=?", uid).Find(articles)
	isErr, _ := ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).ReturnInfo()
	return isErr, articles
}

func (a *Article) Detail(articleID uint) (bool, *models.Article) {
	article := new(models.Article)
	result := a.DB.First(article, "ID = ?", articleID) //default model is First()'s first argument
	return util.CrudJudgement(result), article
}

func (a *Article) Create(articleDto *dto.ArticleDto) (isError bool, message string) {
	ds := new(util.DbRes)
	article := &models.Article{
		UserID:      articleDto.UserID,
		Title:       articleDto.Title,
		Description: articleDto.Description,
		Content:     articleDto.Content,
	}
	result := a.DB.Create(article) //if insert error,gorm will log the error
	return ds.AssignResults(result).DistinguishSqlErrType().AssignDefaultsIsErr().AssignDefaultMessage(cst.ARTICLE_CREATE).ReturnInfo()
}

func (a *Article) Edit(articleDto *dto.ArticleDtoForEdit) (isError bool, message string) {
	ds := new(util.DbRes)
	article := &models.Article{
		ID:          articleDto.ArticleID,
		UserID:      articleDto.UserID,
		Title:       articleDto.Title,
		Description: articleDto.Description,
		Content:     articleDto.Content,
	}
	// 根据 `struct` 更新属性，只会更新非零值的字段
	//update() for single row,updates() for multiple row(use struct or map)
	result := a.DB.Model(&models.Article{ID: article.ID}).Updates(article)
	return ds.AssignResults(result).DistinguishSqlErrType().AssignDefaultsIsErr().AssignDefaultMessage(cst.ARTICLE_EDIT).ReturnInfo()
}

func (a *Article) Delete(articleDto *dto.ArticleDtoForDelete) (isError bool, message string) {
	article := &models.Article{ID: articleDto.ArticleID}
	//start transaction
	err := a.DB.Transaction(func(tx *gorm.DB) error {
		// 在事务中执行一些 db 操作（从这里开始，您应该使用 'tx' 而不是 'db'）
		if err := tx.Unscoped().Where("article_id = ?", articleDto.ArticleID).Delete(&models.Comment{}).Error; err != nil {
			return err
		}
		if err := tx.Unscoped().Where("id = ?", articleDto.ArticleID).Delete(article).Error; err != nil {
			// 返回任何错误都会回滚事务
			return err
		}
		// 返回 nil 提交事务
		return nil
	})
	if err == nil {
		return false, cst.ARTICLE_DELETE
	} else {
		fmt.Println(err, 4678)
		return true, cst.SERVER_ERR
	}
}
