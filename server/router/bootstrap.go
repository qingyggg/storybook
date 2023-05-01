package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func Bootstrap(routes ...func()) {
	r = gin.Default() //initialize gin
	r.Use(Cors()) 
  
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusAccepted, "welcome visited storybook server!")
	})
	//register controller
	RegRoutes(routes)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func GetAppRouter() *gin.Engine {
	return r
}

func Cors() gin.HandlerFunc{
	return func(ctx *gin.Context) {
		method := ctx.Request.Method

		ctx.Header("Access-Control-Allow-Origin", "*")
		ctx.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token, x-token")
		ctx.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PATCH, PUT")
		ctx.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		ctx.Header("Access-Control-Allow-Credentials", "true")

		if method == "OPTIONS" {
		ctx.AbortWithStatus(http.StatusNoContent)
		}
	}
}