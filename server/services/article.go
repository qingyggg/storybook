package services

import (
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Article struct {
	DB *gorm.DB
}

//TODO: label,keyword will add later

func (a *Article) List(offset uint,keyword string) (bool, *models.ApiArticleList) {
	//NOTE: except title,description field,other field will be returned zero value
	articles := new(models.ApiArticleList)
	result := a.DB.Model(&models.Article{}).Where("title like"+"%"+keyword+"%").Limit(10).Offset(int(offset)).Find(articles)
	return util.CrudJudgement(result), articles
}

func (a *Article) Detail(articleID uint) (bool, *models.Article) {
	//NOTE:will return all field about this struct,none zero value fields
	article := new(models.Article)
	result := a.DB.First(article, "ID = ?", articleID) //default model is First()'s first argument
	return util.CrudJudgement(result), article
}

func (a *Article) Create(articleDto *dto.ArticleDto) bool {
	article := &models.Article{
		UserID:      articleDto.UserID,
		Title:       articleDto.Title,
		Description: articleDto.Description,
		Content:     articleDto.Content,
	}
	result := a.DB.Create(article) //if insert error,gorm will log the error
	return util.CrudJudgement(result)
}

func (a *Article) Edit(articleDto *dto.ArticleDtoForEdit) bool {
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
	return util.CrudJudgement(result)
}

func (a *Article) Delete(articleDto *dto.ArticleDtoForDelete) bool {
	article := &models.Article{ID: articleDto.ArticleID}
	result := a.DB.Delete(article)
	return util.CrudJudgement(result)
}
