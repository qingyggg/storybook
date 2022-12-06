package main

import (
	"log"

	"github.com/gin-gonic/gin"
	db "github.com/qingyggg/storybook/server/db"
)

func main() {
  //initialize db
  err:=db.Bootstrap()
  if err!=nil{
    log.Fatal("database connection failed!!!")
  }
  r := gin.Default()
  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
