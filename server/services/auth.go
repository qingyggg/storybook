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

func (a *Auth) BeforeModify(authDto *dto.AuthDtoForModify) (bool,string){
	ds:=new(util.DbRes)
	auth:=&models.User{
		ID:       authDto.ID,
		Password: authDto.OldPassword,
	}
	results:=a.DB.Find(&models.User{},auth)
	//id is unavailable(its impossible unless user modify user id param according url on chrome) or password is incorrect
	return ds.AssignResults(results).DistinguishSqlErrType().AssignIsErr([]uint{1,0}).AssignMessage([]string{"",cst.OLD_PASSWORD_ERR}).ReturnInfo()
}

// modify password 
//results:modify okay or internal
func (a *Auth) Modify(authDto *dto.AuthDtoForModify) (bool ,string) {
	ds:=new(util.DbRes)
	auth := &models.User{
		ID:       authDto.ID,
		Password: authDto.Password,
	}
	result := a.DB.Model(&models.User{}).Where("id = ?", auth.ID).Updates(auth)
	return ds.AssignResults(result).DistinguishSqlErrType().AssignMessage([]string{cst.MODIFY,cst.SERVER_ERR}).AssignDefaultsIsErr().ReturnInfo()
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
func (a *Auth) Register(authDto *dto.AuthDto) bool{

	auth := &models.User{
		Email:    authDto.Email,
		Password: authDto.Password,
	}
	result := a.DB.Create(auth)
	return util.CrudJudgement(result)
}
