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

func CommentController() {
	comment := router.GetAppRouter().Group("/comment")
	cs := services.Comment{DB: db.GetDataBase()}
	comment.GET("/list", func(ctx *gin.Context) {
		articleId := util.QueryDefaultAssigner(ctx, "ArticleId", "0")
		isErr, list := cs.List(util.StringConvertToUint(articleId))
		util.Response(ctx, !isErr, list)
	})
	comment.GET("/mylist", func(ctx *gin.Context) {
		userId := util.QueryDefaultAssigner(ctx, "UserId", "0")
		isErr, list := cs.MyList(util.StringConvertToUint(userId))
		util.Response(ctx, !isErr, list)
	})
	comment.POST("/create", func(ctx *gin.Context) {
		var ok bool
		newRes := new(util.ResPayload)
		cBody := &dto.CommentDtoForCreate{}
		util.AssignBodyJson(ctx, cBody)
		if cs.Create(cBody) && cs.CommentNumberModify(cBody.ArticleID, "add") {
			ok = true
		} else {
			ok = false
		}
		newRes.SetIsError(!ok).SetMessage2(cst.COMMENT_CREATE).Response(ctx)
	})
	comment.POST("/delete", func(ctx *gin.Context) {
		var isErr bool
		newRes := new(util.ResPayload)
		cBody := &dto.CommentDtoForDelete{}
		util.AssignBodyJson(ctx, cBody)
		if cs.Delete(cBody) && cs.CommentNumberModify(cBody.ArticleID, "delete") {
			//*type *get value  &get address
			isErr = false
		} else {
			isErr = true
		}
		newRes.SetIsError(isErr).SetMessage2(cst.COMMENT_DELETE).Response(ctx)
	})
	comment.POST("/edit", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		cBody := &dto.CommentDtoForEdit{}
		util.AssignBodyJson(ctx, cBody)
		ok := cs.Edit(cBody)
		newRes.SetIsError(!ok).SetMessage2(cst.COMMENT_EDIT).Response(ctx)
	})
	comment.POST("/like", func(ctx *gin.Context) {
		var isErr bool
		var signal string
		var sucMsg string
		lBody := &dto.LikeDto{}
		util.AssignBodyJson(ctx, lBody)
		newRes := new(util.ResPayload)
		isErr, msg := cs.LikeShow(lBody)
		if isErr {
			//sql err->server error to client
			newRes.SetDefault(true, nil).Response(ctx)
			return
		} else {
			if msg == cst.LIKE_RECORD {
				signal = "delete"
				sucMsg = cst.ARTICLE_DISLIKE
			} else if msg == cst.LIKE_NO_RECORD {
				signal = "add"
				sucMsg = cst.ARTICLE_LIKE
			}
		}
		if cs.Like(lBody, signal) {
			isErr = false
		} else {
			isErr = true
		}
		newRes.SetIsError(isErr).SetMessage2(sucMsg).Response(ctx)
	})
	comment.POST("/likeStatus", func(ctx *gin.Context) {
		var status bool
		lBody := &dto.LikeDto{}
		util.AssignBodyJson(ctx, lBody)
		newRes := new(util.ResPayload)
		isErr, msg := cs.LikeShow(lBody)
		if msg == cst.LIKE_RECORD {
			status = true
		} else {
			status = false
		}
		newRes.SetDefaultMsg(isErr).SetData(map[string]bool{"isLike": status}).Response(ctx)
	})
	comment.POST("/BatchLikeStatus", func(ctx *gin.Context) {
		newRes := new(util.ResPayload)
		lsBody := &dto.LikesDto{}
		util.AssignBodyJson(ctx, lsBody)
		isErr, statusArr := cs.LikesShow(lsBody)
		newRes.SetDefaultMsg(isErr).SetData(statusArr).Response(ctx)
	})
	//post:reply comment,like,dislike comment
}
