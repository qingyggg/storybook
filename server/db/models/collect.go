package models

import "gorm.io/gorm"

type Collect struct {
	gorm.Model
	UserID    uint
	ArticleID uint
}
