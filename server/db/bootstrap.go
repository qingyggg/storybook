package db

import (
	models "github.com/qingyggg/storybook/server/db/models"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Bootstrap() {
	DB = dbConnect()
	DB.AutoMigrate(&models.Article{}, &models.User{}, &models.Comment{},  &models.Like{},&models.UserProfile{})
}

func GetDataBase() *gorm.DB {
	return DB
}
