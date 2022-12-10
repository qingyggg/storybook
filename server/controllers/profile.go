package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/db"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/router"
	"github.com/qingyggg/storybook/server/services"
	"github.com/qingyggg/storybook/server/util"
)

func ProfileController() {
	profile := router.GetAppRouter().Group("/profile")
	ps:=services.Profile{DB: db.GetDataBase()}
	profile.GET("/show", func(ctx *gin.Context) {
		ok,profile:=ps.Show(util.StringConvertToUint(ctx.Query("userId")))
		util.Response(ctx,ok,profile)
	})
	profile.POST("/edit", func(ctx *gin.Context) {
		pBody := &dto.UserProfileDtoForEdit{}
		util.AssignBodyJson(ctx, pBody)
		ok:=ps.Edit(pBody)//* get value, & get address,*int type
		util.Response(ctx,ok)
	})
	profile.POST("/create", func(ctx *gin.Context) {	
		pBody := &dto.UserProfileDto{}
		util.AssignBodyJson(ctx, pBody)
		ok:=ps.Create(pBody)//* get value, & get address,*int type
		util.Response(ctx,ok)
	})
}
