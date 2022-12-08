package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ResponseType struct{
	message string
	isError bool
	data interface{}
}

//obtain json request body and convert to struct
func AssignBodyJson[T any](ctx *gin.Context,bodyDto T) {
	if err:=ctx.BindJSON(bodyDto);err!=nil{
		ctx.AbortWithError(http.StatusBadRequest,err)
		return 
	}
}

func Response(ctx *gin.Context,ok bool,resObj ...interface{}){
	if !ok{
		ctx.JSON(http.StatusBadRequest,&ResponseType{"server has an internal error!",true,nil})
	}else{
		ctx.JSON(http.StatusAccepted,&ResponseType{"request ok!",false,resObj[0]})
	}
}
