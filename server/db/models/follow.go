package models

import "gorm.io/gorm"

type Follow struct {
	gorm.Model
	UserID     uint
	FollowedID uint
}

type ApiFollow struct {
	UserID      uint
	Name        string
	Description string
}
type ApiFollowList = []ApiFollow
