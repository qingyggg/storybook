package router

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func Bootstrap(routes ...func()) {
	r = gin.Default() //initialize gin
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
