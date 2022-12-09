package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Email    string `gorm:"unique"`
	Password string
	Articles []Article   
	Comments []Comment   
	Profile  UserProfile 
	Likes    []Like      
}
