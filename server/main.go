package main

import (
	"github.com/qingyggg/storybook/server/controllers"
	"github.com/qingyggg/storybook/server/db"
	"github.com/qingyggg/storybook/server/router"
	"github.com/qingyggg/storybook/server/util"
)

func main() {
	//initialize db
	db.Bootstrap()
	//initialize router
	router.Bootstrap(
		controllers.ArticleController,
		controllers.AuthController,
		controllers.CommentController,
		controllers.ProfileController,
		controllers.BehaviorController,
		controllers.CollectController,
	)
}
func init() {
	util.EnvInit()
}
