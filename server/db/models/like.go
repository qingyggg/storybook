package models

import "gorm.io/gorm"

type Like struct {
	gorm.Model
	ArticleID uint
	UserID uint
}