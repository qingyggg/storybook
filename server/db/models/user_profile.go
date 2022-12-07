package models

import (
	"gorm.io/gorm"
)

type UserProfile struct{
	gorm.Model
	UserID uint
	Name string
	Age      uint8
	Avatar []byte
	Description string
  Contact Contact
}

type Contact struct{
	Github string
	WeChat string
	Twitter string
}