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
	as := services.Article{DB: db.GetDataBase()}

	article.GET("/list", func(ctx *gin.Context) {
		offset:=util.QueryDefaultAssigner(ctx,"offset","0")
		ok, list := as.List(util.StringConvertToUint(offset),ctx.Query("keyword")) //url:/list?offset=25
		util.Response(ctx, ok, list)
	})

	article.GET("/detail", func(ctx *gin.Context) {
		ok, detail := as.Detail(util.StringConvertToUint("articleID"))
		util.Response(ctx, ok, detail)
	})

	article.POST("/create", func(ctx *gin.Context) {
		// using BindJson method to serialize body with struct
		aBody := &dto.ArticleDto{}
		util.AssignBodyJson(ctx, aBody) //get request body and assign to aBody
		ok := as.Create(aBody)
		util.Response(ctx, ok)
	})
	article.POST("/edit", func(ctx *gin.Context) {
		aBody := &dto.ArticleDtoForEdit{}
		util.AssignBodyJson(ctx, aBody)
		ok := as.Edit(aBody)
		util.Response(ctx, ok)
	})
	article.POST("/delete", func(ctx *gin.Context) {
		aBody := &dto.ArticleDtoForDelete{}
		util.AssignBodyJson(ctx, aBody)
		ok := as.Delete(aBody)
		util.Response(ctx, ok)
	})
}
