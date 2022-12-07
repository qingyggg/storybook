package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"unique"`
	Password string
	Articles []Article   `gorm:"foreignKey:AuthorID"`
	Comments []Comment   `gorm:"foreignKey:UserID"`
	Profile  UserProfile `gorm:"foreignKey:UserID"`
	Likes    []Like      `gorm:"foreignKey:UserID"`
}
