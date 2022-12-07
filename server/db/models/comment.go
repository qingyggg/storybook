package models

import "gorm.io/gorm"

type Comment struct{
	gorm.Model
	UserId uint
	ArticleId uint
	Content string
}