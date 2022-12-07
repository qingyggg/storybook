package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string
	Email    string
	Age      uint8
	Articles []Article   `gorm:"foreignKey:AuthorID"`
	Comments []Comment   `gorm:"foreignKey:UserID"`
	Profile  UserProfile `gorm:"foreignKey:UserID"`
	Likes    []Like      `gorm:"foreignKey:UserID"`
}
