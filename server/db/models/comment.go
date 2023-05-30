package models

import "gorm.io/gorm"

type Comment struct {
	gorm.Model
	ID        uint `gorm:"primarykey;autoIncrement"`
	UserID    uint
	ArticleID uint
	Content   string
}

type ApiComments []ApiComment
type ApiComment struct {
	Comment
	UserName string
}
