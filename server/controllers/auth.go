package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/router"
)

func AuthController(){
	comment:=router.GetAppRouter().Group("/comment")
	comment.POST("/login",func(ctx *gin.Context) {
		//TODO: article ID,userID,comment model
		//...
		
	})
	comment.POST("/register",func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Id
		//...
		
	})
	comment.POST("/modifyProfile",func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Model
		//...
		
	})
}
