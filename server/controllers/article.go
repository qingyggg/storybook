package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/router"
)

func ArticleController() {
	article := router.GetAppRouter().Group("/article")
	article.GET("/list", func(ctx *gin.Context) {
		//TODO: key word,label select,offset,limit
		//...

	})
	article.GET("/detail", func(ctx *gin.Context) {
		//TODO: article ID
		//...

	})
	article.POST("/comment", func(ctx *gin.Context) {
		//TODO: article ID,userID,comment model
		//...

	})
	article.POST("/like", func(ctx *gin.Context) {
		//TODO: article ID,userID
		//...

	})
	article.POST("/create", func(ctx *gin.Context) {
		//TODO: userID,article model(except ID)
		//...

	})
	article.POST("/edit", func(ctx *gin.Context) {
		//TODO: userId,article model
		//...

	})
	article.POST("/delete", func(ctx *gin.Context) {
		//TODO: userId(for auth),articleId
		//...

	})
}
