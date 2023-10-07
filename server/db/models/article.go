package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	ID            uint `gorm:"primarykey;autoIncrement"`
	Title         string
	Description   string
	Content       string
	UserID        uint      //author id
	Comments      []Comment `gorm:"foreignKey:ArticleID"`
	Likes         []Like    `gorm:"foreignKey:ArticleID"`
	Collects      []Collect `gorm:"foreignKey:ArticleID"`
	LikeNumber    uint
	CommentNumber uint
	CollectNumber uint
}

type ApiArticleListForItem struct {
	ID            uint
	Title         string
	Description   string
	LikeNumber    uint
	CommentNumber uint
	CollectNumber uint
}

type ApiArticleLikesAndCommentsAmount struct {
	ArticleID     uint
	LikeNumber    uint
	CommentNumber uint
	CollectNumber uint
}

type ApiArticleList = []ApiArticleListForItem
