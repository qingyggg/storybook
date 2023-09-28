package db

import (
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// connect mysql
func dbConnect() *gorm.DB {
	// 参考 https://github.com/go-sql-driver/mysql#dsn-data-source-name 获取详情
	dsn := os.Getenv("MYSQL_USER") + ":" + os.Getenv("MYSQL_PWD") + "@tcp(" + os.Getenv("SQL_URL") + ":3306)/storybook?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(getOrmLogMode()),
	})
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func getOrmLogMode() logger.LogLevel {
	if os.Getenv("FOO_ENV") == "production" {
		return logger.Warn
	} else {
		return logger.Info
	}
}
