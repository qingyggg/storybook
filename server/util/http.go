package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

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

//12-14
// type ResponsePayload struct{
// 	ok bool							--->true,false
// 	okMessage string   --->article has been created
// 	errMessage string		--->article created failed
// }
// func Response(ctx *gin.Context, rp *ResponsePayload,, resObj ...interface{}) {
// 	if !ok {
// 		ctx.JSON(http.StatusAccepted, gin.H{"message":rp.okMessage, "isErr": rp.ok, "data": resObj})
// 	} else {
// 		ctx.JSON(http.StatusBadRequest, gin.H{"message": rp.errMessage, "isErr": rp.ok, "data": nil})
// 	}
// }
