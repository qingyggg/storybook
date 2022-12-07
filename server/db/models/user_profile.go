package models

import (
	"gorm.io/gorm"
)

type UserProfile struct{
	gorm.Model
	UserID uint
	Avatar []byte
	Description string
	Email string
  Contact Contact
}

type Contact struct{
	Github string
	WeChat string
	Twitter string
}