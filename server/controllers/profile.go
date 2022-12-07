package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/router"
)

func ProfileController() {
	profile := router.GetAppRouter().Group("/profile")
	profile.GET("/show", func(ctx *gin.Context) {
		//TODO: article ID,userID,comment model
		//...

	})
	profile.POST("/edit", func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Id
		//...

	})
	profile.POST("/create", func(ctx *gin.Context) {
		//TODO: article ID,userID,comment Id
		//...

	})
}
