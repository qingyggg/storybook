package services

import (
	cst "github.com/qingyggg/storybook/server/constants"
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Article struct {
	DB *gorm.DB
}

// List TODO: label,keyword will add later=
func (a *Article) List(offset uint) (bool, *models.ApiArticleList) {
	//NOTE: except title,description field,other field will be returned zero value
	articles := new(models.ApiArticleList)
	result := a.DB.Model(&models.Article{}).Limit(10).Offset(int(offset)).Find(articles)
	return util.CrudJudgement(result), articles
}

func (a *Article) Detail(articleID uint) (bool, *models.Article) {
	//NOTE:will return all field about this struct,none zero value fields
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
	ds := new(util.DbRes)
	article := &models.Article{ID: articleDto.ArticleID}
	result := a.DB.Delete(article)
	return ds.AssignResults(result).DistinguishSqlErrType().AssignDefaultsIsErr().AssignDefaultMessage(cst.ARTICLE_DELETE).ReturnInfo()
}
