package services

import (
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"gorm.io/gorm"
)

type Article struct {
	DB *gorm.DB
}

//TODO: label,keyword will add later

func (a *Article) List(offset uint) *models.Articles{
	//NOTE: except title,description field,other field will be returned zero value
	articles:=new(models.Articles)
	//default limits:25
	a.DB.Limit(10).Select([]string{"Title", "Description"}).Offset(int(offset)).Find(articles)
	return articles
}
func (a *Article) Detail(articleID uint) *models.Article{
	//NOTE:will return all field about this struct,none zero value fields
	article:=new(models.Article)
	a.DB.First(&article, "ID = ?", articleID)
	return article
}
func (a *Article) Create(article *dto.ArticleDto) {
	
}

func (a *Article) Edit(article *dto.ArticleDtoForEdit) {

}

func (a *Article) Delete(article *dto.ArticleDtoForDelete) {

}
