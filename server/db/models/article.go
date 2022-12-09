package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	ID          uint `gorm:"primarykey;autoIncrement"`
	Title       string
	Description string
	Content     string
	UserID      uint
	Comments    []Comment `gorm:"foreignKey:ArticleID"`
	Likes       []Like    `gorm:"foreignKey:ArticleID"`
}

type ApiArticleListForItem struct {
	ID          uint
	Title       string
	Description string
	Likes       []Like `gorm:"foreignKey:ArticleID"`
}

type ApiArticleList = []ApiArticleListForItem
