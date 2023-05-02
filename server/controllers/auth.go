package controllers

import (
	"github.com/gin-gonic/gin"
	cst "github.com/qingyggg/storybook/server/constants"
	"github.com/qingyggg/storybook/server/db"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/router"
	"github.com/qingyggg/storybook/server/services"
	"github.com/qingyggg/storybook/server/util"
)

func AuthController() {
	auth := router.GetAppRouter().Group("/auth")//initialize route
	aus := services.Auth{DB: db.GetDataBase()}//initialize database
	auth.POST("/login", func(ctx *gin.Context) {
		var newRes *util.ResPayload
		auBody := &dto.AuthDto{}//get request template
		util.AssignBodyJson(ctx, auBody)//get request body
		isErr,msg := aus.Login(auBody, false)//invoke  service fuc
		newRes.SetIsError(isErr).SetMessage(msg).Response(ctx)//set response body and response to client
	})
	auth.POST("/register", func(ctx *gin.Context) {
		newRes:=new(util.ResPayload) 
		auBody := &dto.AuthDto{}
		util.AssignBodyJson(ctx, auBody)
		isErr,msg := aus.Login(auBody, true) 
		//sql error
		if msg==cst.SERVER_ERR{
			newRes.SetDefaultMsg(true).Response(ctx)
			return 
		}
		//if isErr == false,account indeed exists
		if !isErr{
			newRes.SetIsError(true).SetMessage(cst.ACCOUNT_EXISTS).Response(ctx)
		}else{
				ok := aus.Register(auBody)
				if(ok){
					newRes.SetIsError(false).SetMessage(cst.REGISTER).Response(ctx)
				}else{
					newRes.SetDefaultMsg(true).Response(ctx)
				}
		}
	})
	auth.POST("/modifyPwd", func(ctx *gin.Context) {
		auBody := &dto.AuthDtoForModify{}
		util.AssignBodyJson(ctx, auBody)
		ok := aus.Modify(auBody)
		util.Response(ctx, ok)
	})
}


