package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID          uint `gorm:"primarykey;autoIncrement"`
	Email    string `gorm:"unique"`
	Password string
	Articles []Article   
	Comments []Comment   
	Profile  UserProfile 
	Likes    []Like      
}
