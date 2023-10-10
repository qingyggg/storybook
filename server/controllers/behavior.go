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

func BehaviorController() {
	behavior := router.GetAppRouter().Group("/behavior")
	bs := services.Behavior{DB: db.GetDataBase()}
	behavior.POST("/follow", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		fBody := &dto.FollowDto{}
		util.AssignBodyJson(ctx, fBody)
		isErr, signal := bs.FollowStatus(fBody)
		if isErr {
			newRes.SetDefault(true, nil).Response(ctx)
		} else {
			var isOk bool
			var msg string
			var isFollow bool
			if signal == cst.FOLLOW_RECORD {
				isOk, msg = bs.Unfollow(fBody)
				isFollow = false
			} else if signal == cst.FOLLOW_NORECORD {
				isOk, msg = bs.Follow(fBody)
				isFollow = true
			}
			newRes.SetIsError(!isOk).SetData(map[string]bool{"isFollow": isFollow}).SetMessage2(msg).Response(ctx)
		}
	})
	behavior.POST("/followStatus", func(ctx *gin.Context) {
		var status bool
		fBody := &dto.FollowDto{}
		util.AssignBodyJson(ctx, fBody)
		newRes := new(util.ResPayload)
		isErr, msg := bs.FollowStatus(fBody)
		if msg == cst.FOLLOW_RECORD {
			status = true
		} else {
			status = false
		}
		newRes.SetDefaultMsg(isErr).SetData(map[string]bool{"isFollow": status}).Response(ctx)
	})
	behavior.GET("/followingList", func(ctx *gin.Context) {
		uid := util.QueryDefaultAssigner(ctx, "uid", "-1")
		err, list := bs.FollowingList(util.StringConvertToUint(uid))
		util.Response(ctx, !err, list)
	})
	behavior.GET("/followedList", func(context *gin.Context) { //context->ctx
		uid := util.QueryDefaultAssigner(context, "uid", "-1")
		isErr, list := bs.FollowedList(util.StringConvertToUint(uid))
		util.Response(context, !isErr, list)
	})
	//follow amount can be got from profile model
	behavior.GET("/followAmount", func(ctx *gin.Context) {
		uid := util.QueryDefaultAssigner(ctx, "uid", "-1")
		isOk, amountPayload := bs.FollowAmount(util.StringConvertToUint(uid))
		util.Response(ctx, isOk, amountPayload)
	})
}
