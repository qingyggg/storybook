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
	auth := router.GetAppRouter().Group("/auth") //initialize route
	aus := services.Auth{DB: db.GetDataBase()}   //initialize database and service
	pus := services.Profile{DB: db.GetDataBase()}
	auth.POST("/login", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		auBody := &dto.AuthDto{}                               //get request template
		util.AssignBodyJson(ctx, auBody)                       //get request body
		isErr, msg := aus.Login(auBody, false)                 //invoke  service fuc
		newRes.SetIsError(isErr).SetMessage(msg).Response(ctx) //set response body and response to client
	})
	auth.POST("/register", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		auBody := &dto.AuthDto{}
		util.AssignBodyJson(ctx, auBody)
		isErr, msg := aus.Login(auBody, true)
		//sql error
		if msg == cst.SERVER_ERR {
			newRes.SetDefaultMsg(true).Response(ctx)
			return
		}
		//if isErr == false,account indeed exists
		if !isErr {
			newRes.SetIsError(true).SetMessage(cst.ACCOUNT_EXISTS).Response(ctx)
		} else {
			ok := aus.Register(auBody)
			if ok {
				//set Original user profile
				ok1 := pus.Create(&dto.UserProfileDto{}, auBody)
				if ok1 {
					newRes.SetIsError(false).SetMessage(cst.REGISTER).Response(ctx)
				} else {
					newRes.SetIsError(true).SetMessage(cst.SERVER_ERR).Response(ctx)
				}
			} else {
				newRes.SetDefaultMsg(true).Response(ctx)
			}
		}
	})
	auth.POST("/modifyPwd", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		auBody := &dto.AuthDtoForModify{}
		util.AssignBodyJson(ctx, auBody)
		isErr, message := aus.BeforeModify(auBody)
		if isErr {
			newRes.SetIsError(true).SetMessage(message).Response(ctx)
		} else {
			isErr, message := aus.Modify(auBody)
			newRes.SetMessage(message).SetIsError(isErr).Response(ctx)
		}
	})
	auth.POST("/updateToken", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		util.VerifyJwt(ctx)
		userId, err := util.ExtractClaims(ctx)
		if err != nil {
			newRes.SetDefault(true, nil).Response(ctx)
		}
		resToken(ctx, userId, newRes)
	})
	auth.POST("/generateNewToken", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		auBody := &dto.AuthDtoJWT{}
		util.AssignBodyJson(ctx, auBody)
		resToken(ctx, auBody.UserId, newRes)
	})
}

func resToken(ctx *gin.Context, userId string, newRes *util.ResPayload) {
	token, err := util.GenerateJWT(userId)
	if err != nil {
		newRes.SetDefault(true, nil).Response(ctx)
	} else {
		ctx.Header("Token", token)
		newRes.SetDefault(false, nil).Response(ctx)
	}
}
