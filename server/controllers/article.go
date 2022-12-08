package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/db"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/router"
	"github.com/qingyggg/storybook/server/services"
	"github.com/qingyggg/storybook/server/util"
)

func ArticleController() {
	article := router.GetAppRouter().Group("/article")
	as:=services.Article{DB:db.GetDataBase()}

	article.GET("/list", func(ctx *gin.Context) {
		as.List(util.StringConvertToUint(ctx.Query("offset")))//url:/list?offset=25
	})

	article.GET("/detail", func(ctx *gin.Context) {
		as.Detail(util.StringConvertToUint("articleID"))
	})

	article.POST("/create", func(ctx *gin.Context) {
		// using BindJson method to serialize body with struct
		aBody:=&dto.ArticleDto{}
		util.AssignBodyJson(ctx,aBody)
		as.Create(aBody)
	})
	article.POST("/edit", func(ctx *gin.Context) {
		aBody:=&dto.ArticleDtoForEdit{}
		util.AssignBodyJson(ctx,aBody)
		as.Edit(aBody)
	})
	article.POST("/delete", func(ctx *gin.Context) {
		aBody:=&dto.ArticleDtoForDelete{}
		util.AssignBodyJson(ctx,aBody)
		as.Delete(aBody)
	})
}
