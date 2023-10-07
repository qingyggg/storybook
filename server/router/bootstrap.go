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
	if os.Getenv("FOO_ENV") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	r = gin.Default() //initialize gin
	r.Use(Cors())
	r.Use(JwtAuth())
	//register controller
	RegRoutes(routes)
	err := r.RunTLS(":8080", os.Getenv("CERT_PATH"), os.Getenv("KEY_PATH"))
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
		origin := ctx.Request.Header.Get("Origin")
		//ctx.Request.Host
		ctx.Header("Access-Control-Allow-Origin", origin)
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
