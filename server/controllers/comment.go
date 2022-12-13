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
		var ok bool
		cBody := &dto.CommentDtoForCreate{}
		util.AssignBodyJson(ctx, cBody)
		if cs.Create(cBody)&&cs.CommentNumberModify(cBody.ArticleID,true){
			ok=true
		}else{
			ok=false
		}
		util.Response(ctx, ok)
	})
	comment.POST("/delete", func(ctx *gin.Context) {
		var ok *bool
		cBody := &dto.CommentDtoForDelete{}
		util.AssignBodyJson(ctx, cBody)
		if cs.Delete(cBody)&&cs.CommentNumberModify(cBody.ArticleID,true){
			//*type *get value  &get address
			*ok=true
		}else{
			*ok=false
		}
		util.Response(ctx, *ok)
	})
	comment.POST("/edit", func(ctx *gin.Context) {
		cBody := &dto.CommentDtoForEdit{}
		util.AssignBodyJson(ctx, cBody)
		ok := cs.Edit(cBody)
		util.Response(ctx, ok)
	})
	comment.POST("/like", func(ctx *gin.Context) {
		lBody := &dto.LikeDto{}
		dlBody:=&dto.DisLikeDto{}
		var ok bool
		util.AssignBodyJson(ctx, lBody)
		if has, recordID := cs.LikeJudgement(lBody); has == 0 {
			if cs.Like(lBody) && cs.LikeNumberModify(lBody.ArticleID,true){
				//*type *get value  &get address
				ok=true
			}else{
				ok=false
			}
		} else if has == 1 {
			dlBody.ID=recordID
			if cs.DisLike(dlBody) && cs.LikeNumberModify(lBody.ArticleID,false){
				ok=true
			}else{
				ok=false
			}
		} else { //record==-a,this means sql has happened some errors except no records
			ok = false
		}
		if(ok){
			//NOTE:ok2 variable is different from ok
			ok2,isLike:=cs.LikeStatusShow(lBody)
			util.Response(ctx,ok2,isLike)
		}else{
			util.Response(ctx,ok)
		}
	})
}
