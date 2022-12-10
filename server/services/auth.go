package services

import (
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Auth struct {
	DB *gorm.DB
}

// modify password
func (a *Auth) Modify(authDto *dto.AuthDtoForModify) bool {
	auth := &models.User{
		ID:       authDto.ID,
		Email:    authDto.Email,
		Password: authDto.Password,
	}
	result := a.DB.Model(&models.User{}).Updates(auth)
	return util.CrudJudgement(result)
}
//forRegister false is bool zero value
func (a *Auth) Login(authDto *dto.AuthDto,forRegister bool) bool {
	var auth *models.User
	if forRegister {
		auth = &models.User{
			Email: authDto.Email,
		}
	} else {
		//email in user table is unique,and one user only has one email
		auth = &models.User{
			Email:    authDto.Email,
			Password: authDto.Password,
		}
	}
	result := a.DB.Model(&models.User{}).Find(auth)
	//according rows.affected to judge whether user login success
	return util.CrudJudgement(result)
}

// before call Register,controller should call login,
// to ensure this user was not exists
func (a *Auth) Register(authDto *dto.AuthDto) bool {
	auth := &models.User{
		Email:    authDto.Email,
		Password: authDto.Password,
	}
	result := a.DB.Create(auth)
	return util.CrudJudgement(result)
}
//initialize db