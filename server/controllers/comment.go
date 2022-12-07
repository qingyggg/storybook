package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/router"
)

func CommentController(){
	comment:=router.GetAppRouter().Group("/comment")
	comment.POST("/comment",func(ctx *gin.Context) {
		//TODO: article ID,userID,comment model
		//...
		
	})
	comment.POST("/deleteComment",func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Id
		//...
		
	})
	comment.POST("/editComment",func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Model
		//...
		
	})
	comment.POST("/like",func(ctx *gin.Context) {
		//TODO: article ID,userID
		//...
		
	})
}

