package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// TODO: realize gin response uitl for response http

//obtain json request body and convert to struct
func AssignBodyJson[T any](ctx *gin.Context,bodyDto T) {
	if err:=ctx.BindJSON(bodyDto);err!=nil{
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
	}
}
