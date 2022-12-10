package models

import (
	"gorm.io/gorm"
)

type UserProfile struct{
	gorm.Model
	ID          uint `gorm:"primarykey;autoIncrement"`
	UserID uint
	Name string
	Age      uint8
	Avatar []byte
	Description string
	Github string
	WeChat string
	Twitter string
}
