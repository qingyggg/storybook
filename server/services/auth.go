package services

import (
	cst "github.com/qingyggg/storybook/server/constants"
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

// forRegisterAuth:whether used for register auth or only used for login
func (a *Auth) Login(authDto *dto.AuthDto, forRegisterAuth bool) (bool,string) {
	var auth *models.User
	ds:=new(util.DbRes)
	if forRegisterAuth {
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
	results:=a.DB.Find(&models.User{},auth)//excute sql
	
	//tackle sql results for response body
	ds.AssignResults(results).DistinguishSqlErrType().AssignMessage([]string{cst.LOGIN,cst.ACCOUNT_REPEAT_OR_ERROR_PASSWORD}).AssignIsErr([]uint{1,0})
	c,b:=ds.ReturnInfo()
	return c,b
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
