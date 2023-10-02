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
		auBody := &dto.AuthDto{}                       //get request template
		util.AssignBodyJson(ctx, auBody)               //get request body
		isErr, msg, userId := aus.Login(auBody, false) //invoke  service fuc
		if !isErr {
			nc, err := util.TokenHandler(userId, ctx, false)
			if err != nil {
				newRes.SetIsError(true).SetMessage(cst.SERVER_ERR).SetData(nil).Response(ctx)
			} else {
				newRes.SetIsError(false).SetMessage(cst.LOGIN).SetData(userId).Response(nc)
			}
		} else {
			newRes.SetIsError(isErr).SetMessage(msg).SetData(nil).Response(ctx) //set response body and response to client
		}
	})
	auth.POST("/register", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		auBody := &dto.AuthDto{}
		util.AssignBodyJson(ctx, auBody)
		isErr, msg, _ := aus.Login(auBody, true)
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
					isErr2, _, userId := aus.Login(auBody, true)
					if !isErr2 {
						nc, err := util.TokenHandler(userId, ctx, false)
						if err != nil {
							newRes.SetIsError(true).SetMessage(cst.SERVER_ERR).SetData(nil).Response(ctx)
						} else {
							newRes.SetIsError(false).SetMessage(cst.REGISTER).SetData(userId).Response(nc)
						}
					} else {
						newRes.SetIsError(true).SetMessage(cst.SERVER_ERR).SetData(nil).Response(ctx)
					}

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
	auth.POST("/logout", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		auth := &dto.AuthDtoJWT{}

		util.AssignBodyJson(ctx, auth)
		nc, err := util.TokenHandler(auth.UserId, ctx, true)
		if err != nil {
			newRes.SetIsError(true).SetMessage(cst.SERVER_ERR).Response(ctx)
		} else {
			newRes.SetIsError(false).SetMessage(cst.LOGOUT).Response(nc)
		}
	})
}
