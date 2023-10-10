package models

import (
	"gorm.io/gorm"
)

type UserProfile struct {
	gorm.Model
	ID          uint `gorm:"primarykey;autoIncrement"`
	UserID      uint
	Name        string
	Age         uint8
	Avatar      []byte
	Description string
	Github      string
	WeChat      string
	Twitter     string
	//store this user which is following others
	Follows         []Follow `gorm:"foreignKey:UserID;references:UserID"`
	Followeds       []Follow `gorm:"foreignKey:FollowedID;references:UserID"`
	FollowedNumber  uint
	FollowingNumber uint
}

//refer       foreignKey
//user->id bind userID<-card
