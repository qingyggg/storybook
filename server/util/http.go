package util

import (
	"github.com/gin-gonic/gin"
	cst "github.com/qingyggg/storybook/server/constants"
	"net/http"
)

// QueryDefaultAssigner judging whether current query param is null or not,if null(the default query value is ""),then assign it a func specified default value
func QueryDefaultAssigner(ctx *gin.Context, query string, defaultVal string) string {
	var queryVal string
	if queryVal = ctx.Query(query); queryVal == "" {
		return defaultVal
	} else {
		return queryVal
	}
}

// AssignBodyJson obtain json request body and convert to struct
func AssignBodyJson[T any](ctx *gin.Context, bodyDto T) {
	if err := ctx.BindJSON(bodyDto); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
}

// Response old response func()
func Response(ctx *gin.Context, ok bool, resObj ...interface{}) {
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": cst.SERVER_ERR, "isError": true, "data": nil})
	} else {
		ctx.JSON(http.StatusAccepted, gin.H{"message": cst.REQ_OK, "isError": false, "data": resObj})
	}
}
