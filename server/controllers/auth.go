package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/router"
)

func AuthController() {
	auth := router.GetAppRouter().Group("/auth")
	auth.POST("/login", func(ctx *gin.Context) {
		//TODO: article ID,userID,comment model
		//...

	})
	auth.POST("/register", func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Id
		//...

	})
	auth.POST("/modifyPwd", func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Id
		//...

	})
}
