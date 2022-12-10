package main

import (
	controllers "github.com/qingyggg/storybook/server/controllers"
	db "github.com/qingyggg/storybook/server/db"
	router "github.com/qingyggg/storybook/server/router"
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
	) 
}
