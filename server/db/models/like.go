package models

import "gorm.io/gorm"

type Like struct {
	gorm.Model
	ID          uint `gorm:"primarykey;autoIncrement"`
	ArticleID uint
	UserID uint
} 