package db

import models "github.com/qingyggg/storybook/server/db/models"

func Bootstrap() error{
	db,err:=dbConnect()
	if err!=nil{
		return err
	}
	db.AutoMigrate(&models.Article{}, &models.User{})
	return nil
}