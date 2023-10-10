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

func CollectController() {
	comment := router.GetAppRouter().Group("/comment") //<-register in /comment route
	cs := services.Collect{DB: db.GetDataBase()}
	comment.POST("/collect", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		cBody := &dto.CollectDto{}
		util.AssignBodyJson(ctx, cBody)
		isErr, signal := cs.CollectShow(cBody)
		if isErr {
			newRes.SetDefault(true, nil).Response(ctx)
		} else {
			var isOk bool
			var msg string
			var isCollect bool
			if signal == cst.COLLECT_RECORD {
				isOk, msg = cs.UnCollect(cBody)
				isCollect = false
			} else if signal == cst.COLLECT_NORECORD {
				isOk, msg = cs.Collect(cBody)
				isCollect = true
			}
			newRes.SetIsError(!isOk).SetData(map[string]bool{"isCollect": isCollect}).SetMessage2(msg).Response(ctx)
		}
	})
	comment.POST("/collectStatus", func(ctx *gin.Context) {
		var status bool
		lBody := &dto.CollectDto{}
		util.AssignBodyJson(ctx, lBody)
		newRes := new(util.ResPayload)
		isErr, msg := cs.CollectShow(lBody)
		if msg == cst.COLLECT_RECORD {
			status = true
		} else {
			status = false
		}
		newRes.SetDefaultMsg(isErr).SetData(map[string]bool{"isCollect": status}).Response(ctx)
	})
	comment.GET("/collectList", func(ctx *gin.Context) {
		uid := util.QueryDefaultAssigner(ctx, "uid", "-1")
		err, list := cs.List(util.StringConvertToUint(uid))
		util.Response(ctx, !err, list)
	})
	//get who collected one(specified by articleID) of my article
	//profile.GET("/collectedList", func(ctx *gin.Context) { )
}
