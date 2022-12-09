package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/db"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/router"
	"github.com/qingyggg/storybook/server/services"
	"github.com/qingyggg/storybook/server/util"
)

func CommentController() {
	comment := router.GetAppRouter().Group("/comment")
	cs := services.Comment{DB: db.GetDataBase()}
	comment.POST("/create", func(ctx *gin.Context) {
		cBody := &dto.CommentDtoForCreate{}
		util.AssignBodyJson(ctx, cBody)
		ok := cs.Create(cBody)
		util.Response(ctx, ok)
	})
	comment.POST("/delete", func(ctx *gin.Context) {
		cBody := &dto.CommentDtoForDelete{}
		util.AssignBodyJson(ctx, cBody)
		ok := cs.Delete(cBody)
		util.Response(ctx, ok)
	})
	comment.POST("/edit", func(ctx *gin.Context) {
		cBody := &dto.CommentDtoForEdit{}
		util.AssignBodyJson(ctx, cBody)
		ok := cs.Edit(cBody)
		util.Response(ctx, ok)
	})
	comment.POST("/like", func(ctx *gin.Context) {
		lBody := &dto.LikeDto{}
		var ok bool
		util.AssignBodyJson(ctx, lBody)
		if has, recordID := cs.LikeJudgement(lBody); has == 0 {
			ok = cs.Like(lBody)
		} else if has == 1 {
			ok = cs.DisLike(&dto.DisLikeDto{ID: recordID})
		} else { //record==-a,this means sql has happened some errors except no records
			ok = false
		}
		util.Response(ctx, ok)
	})
}
