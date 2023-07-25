package services

import (
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Profile struct {
	DB *gorm.DB
}

func (p *Profile) Show(userID uint) (bool, *models.UserProfile) {
	profile := new(models.UserProfile)
	result := p.DB.Where("user_id = ?", userID).First(profile)

	return util.CrudJudgement(result), profile
}

func (p *Profile) Edit(profileDto *dto.UserProfileDtoForEdit) (ok bool) {
	profile := &models.UserProfile{
		Name:        profileDto.Name,
		Age:         profileDto.Age,
		Avatar:      profileDto.Avatar,
		Description: profileDto.Description,
		Github:      profileDto.Github,
		Twitter:     profileDto.Twitter,
	}
	result := p.DB.Model(&models.UserProfile{}).Where("user_id=?", profileDto.UserId).Updates(profile)
	ok = util.CrudJudgement(result)
	return
}

// Create one user only call this once after register
func (p *Profile) Create(profileDto *dto.UserProfileDto, authDto *dto.AuthDto) (ok bool) {
	userInfo := &models.User{}
	results := p.DB.Where(&models.User{Email: authDto.Email, Password: authDto.Password}).First(userInfo)
	ok1 := util.CrudJudgement(results)
	if ok1 {
		profile := &models.UserProfile{
			UserID:      userInfo.ID,
			Name:        profileDto.Name,
			Age:         profileDto.Age,
			Avatar:      profileDto.Avatar,
			Description: profileDto.Description,
			Github:      profileDto.Github,
			Twitter:     profileDto.Twitter,
		}
		result := p.DB.Create(profile)
		ok = util.CrudJudgement(result)
	} else {
		ok = false
	}
	return
}
