package db

import (
	models "github.com/qingyggg/storybook/server/db/models"
	"gorm.io/gorm"
)
var db *gorm.DB
func Bootstrap(){
	db=dbConnect()
	db.AutoMigrate(&models.Article{}, &models.User{},&models.Comment{})
}

func getDataBase() *gorm.DB{
	return db
}