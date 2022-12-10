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

func (p *Profile) Show(userID uint) (ok bool, profile *models.UserProfile) {
	result := p.DB.First(profile, userID)
	ok = util.CrudJudgement(result)
	return
}

func (p *Profile) Edit(profileDto *dto.UserProfileDtoForEdit) (ok bool) {
	profile := &models.UserProfile{
		Name:        profileDto.Name,
		Age:         profileDto.Age,
		Avatar:      profileDto.Avatar,
		Description: profileDto.Description,
		Github:      profileDto.Github,
		WeChat:      profileDto.WeChat,
		Twitter:     profileDto.Twitter,
	}
	result := p.DB.Model(&models.UserProfile{ID: profileDto.ID}).Updates(profile)
	ok = util.CrudJudgement(result)
	return
}

// one user only call this once after register
func (p *Profile) Create(profileDto *dto.UserProfileDto) (ok bool) {
	profile := &models.UserProfile{
		Name:        profileDto.Name,
		Age:         profileDto.Age,
		Avatar:      profileDto.Avatar,
		Description: profileDto.Description,
		Github:      profileDto.Github,
		WeChat:      profileDto.WeChat,
		Twitter:     profileDto.Twitter,
	}
	result := p.DB.Create(profile)
	ok = util.CrudJudgement(result)
	return
}
