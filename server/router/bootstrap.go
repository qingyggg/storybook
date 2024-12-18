package router

import (
	"github.com/gin-gonic/gin"
	"github.com/qingyggg/storybook/server/util"
	"log"
	"net/http"
	"os"
	"regexp"
)

var r *gin.Engine

func Bootstrap(routes ...func()) {
	r = gin.Default() //initialize gin
	r.Use(Cors())
	r.Use(JwtAuth())
	//register controller
	RegRoutes(routes)
	err := r.RunTLS(":8080", "/home/alice/localhost.pem", "/home/alice/localhost-key.pem")
	if err != nil {
		log.Fatal(err)
	} // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func GetAppRouter() *gin.Engine {
	return r
}

func Cors() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		method := ctx.Request.Method

		ctx.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		ctx.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token, x-token")
		ctx.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PATCH, PUT")
		ctx.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		ctx.Header("Access-Control-Allow-Credentials", "true")
		if method == "OPTIONS" {
			ctx.AbortWithStatus(http.StatusNoContent)
		}
	}
}

// JwtAuth jwt auth
func JwtAuth() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		for i := 0; i < len(util.BlackList); i++ {
			match, _ := regexp.MatchString(util.BlackList[i], ctx.FullPath())
			if match {
				util.VerifyJwt(ctx, os.Getenv("SECRET_KEY"))
				break
			}
		}
	}
}
