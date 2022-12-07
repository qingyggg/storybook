package router

import "github.com/gin-gonic/gin"

var appRoute *gin.RouterGroup

func Bootstrap(){
	r := gin.Default()       //initialize gin
	appRoute = r.Group("/api") //add api route prefix for per rest url
	r.Run()                  // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func GetAppRouter() *gin.RouterGroup{
	return appRoute
}