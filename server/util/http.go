package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

//judging whether current query param is null or not,if null(the default query value is ""),then assign it a func specified default value
func QueryDefaultAssigner(ctx *gin.Context,query string,defaultVal string) string{
	var queryVal string
	if queryVal=ctx.Query(query);queryVal==""{
		return defaultVal
	}else{
		return queryVal
	}
}

// obtain json request body and convert to struct
func AssignBodyJson[T any](ctx *gin.Context, bodyDto T) {
	if err := ctx.BindJSON(bodyDto); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}
} 

// gin.H type is `map[string]any“
func Response(ctx *gin.Context, ok bool, resObj ...interface{}) {
	if !ok {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "server has an internal error!", "isError": true, "data": nil})
	} else {
		ctx.JSON(http.StatusAccepted, gin.H{"message": "request ok!", "isError": false, "data": resObj})
	}
}
