package main

import (
	db "github.com/qingyggg/storybook/server/db"
	router "github.com/qingyggg/storybook/server/router"
)

func main() {
	db.Bootstrap()     //initialize db
	router.Bootstrap() //initialize router
}
