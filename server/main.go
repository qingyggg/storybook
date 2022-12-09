package main

import (
	controllers "github.com/qingyggg/storybook/server/controllers"
	db "github.com/qingyggg/storybook/server/db"
	router "github.com/qingyggg/storybook/server/router"
)

func main() {
	db.Bootstrap()                                  //initialize db
	router.Bootstrap(controllers.ArticleController) //initialize router
}
