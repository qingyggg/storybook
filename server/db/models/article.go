package models

import "gorm.io/gorm"

type Article struct {
	gorm.Model
	Title       string
	Description string
	Content     string
	AuthorID    uint 
	Comments []Comment `gorm:"foreignKey:CommentID"`
}

type Comment struct{
	gorm.Model
	UserId uint
	ArticleId uint
	Content string
}

