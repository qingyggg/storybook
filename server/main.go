package main

import (
	"github.com/joho/godotenv"
	controllers "github.com/qingyggg/storybook/server/controllers"
	db "github.com/qingyggg/storybook/server/db"
	router "github.com/qingyggg/storybook/server/router"
	"log"
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
func init() {
	//load env
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}
