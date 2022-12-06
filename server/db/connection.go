package db

import (
	"gorm.io/driver/mysql"
  "gorm.io/gorm"
)

//connect mysql
func dbConnect() (*gorm.DB,error) {
  // 参考 https://github.com/go-sql-driver/mysql#dsn-data-source-name 获取详情
  dsn := "root:Alice456@tcp(127.0.0.1:3306)/storybook?charset=utf8mb4&parseTime=True&loc=Local"
  db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db,err
}