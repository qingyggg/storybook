package db

import (
	models "github.com/qingyggg/storybook/server/db/models"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Bootstrap() {
	DB = dbConnect()
	DB.AutoMigrate(&models.User{},&models.UserProfile{},&models.Article{},&models.Like{}, &models.Comment{})
}

func GetDataBase() *gorm.DB {
	return DB
}
