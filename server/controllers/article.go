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
		offset := util.QueryDefaultAssigner(ctx, "offset", "0")
		isErr, list := as.List(util.StringConvertToUint(offset)) //url:/list?offset=25
		util.Response(ctx, !isErr, list)
	})
	article.GET("/mylist", func(ctx *gin.Context) {
		uid := util.QueryDefaultAssigner(ctx, "uid", "0")
		isErr, list := as.MyList(util.StringConvertToUint(uid)) //url:/list?offset=25
		util.Response(ctx, !isErr, list)
	})
	article.GET("/detail", func(ctx *gin.Context) {
		articleId := util.QueryDefaultAssigner(ctx, "articleID", "0")
		ok, detail := as.Detail(util.StringConvertToUint(articleId))
		util.Response(ctx, ok, detail)
	})

	article.POST("/create", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		// using BindJson method to serialize body with struct
		aBody := &dto.ArticleDto{}
		util.AssignBodyJson(ctx, aBody) //get request body and assign to aBody
		isErr, msg := as.Create(aBody)
		newRes.SetMessage(msg).SetIsError(isErr).Response(ctx)
	})
	article.POST("/edit", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		aBody := &dto.ArticleDtoForEdit{}
		util.AssignBodyJson(ctx, aBody)
		isErr, msg := as.Edit(aBody)
		newRes.SetMessage(msg).SetIsError(isErr).Response(ctx)
	})
	article.POST("/delete", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		aBody := &dto.ArticleDtoForDelete{}
		util.AssignBodyJson(ctx, aBody)
		isErr, msg := as.Delete(aBody)
		newRes.SetMessage(msg).SetIsError(isErr).Response(ctx)
	})
}
