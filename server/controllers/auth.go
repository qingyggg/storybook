package controllers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/db"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/router"
	"github.com/qingyggg/storybook/server/services"
	"github.com/qingyggg/storybook/server/util"
)

func AuthController() {
	auth := router.GetAppRouter().Group("/auth")
	aus := services.Auth{DB: db.GetDataBase()}
	auth.POST("/login", func(ctx *gin.Context) {
		auBody := &dto.AuthDto{}
		util.AssignBodyJson(ctx, auBody)
		ok := aus.Login(auBody, false)
		util.Response(ctx, ok)
	})
	auth.POST("/register", func(ctx *gin.Context) {
		auBody := &dto.AuthDto{}
		util.AssignBodyJson(ctx, auBody)
		ok1 := aus.Login(auBody, true)
		fmt.Println("ok1",ok1)
		if !ok1 {
			ok2 := aus.Register(auBody)
			fmt.Println("ok1",ok2)
			util.Response(ctx, ok2)
		} else {
			util.Response(ctx, false)
		}

	})
	auth.POST("/modifyPwd", func(ctx *gin.Context) {
		auBody := &dto.AuthDtoForModify{}
		util.AssignBodyJson(ctx, auBody)
		ok := aus.Modify(auBody)
		util.Response(ctx, ok)
	})
}
