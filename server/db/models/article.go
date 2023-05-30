package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	ID            uint `gorm:"primarykey;autoIncrement"`
	Title         string
	Description   string
	Content       string
	UserID        uint
	Comments      []Comment `gorm:"foreignKey:ArticleID"`
	Likes         []Like    `gorm:"foreignKey:ArticleID"`
	LikeNumber    uint
	CommentNumber uint
}

type ApiArticleListForItem struct {
	ID            uint
	Title         string
	Description   string
	LikeNumber    uint
	CommentNumber uint
}

type ApiArticleLikesAndCommentsAmount struct {
	ArticleID     uint
	LikeNumber    uint
	CommentNumber uint
}

type ApiArticleList = []ApiArticleListForItem
