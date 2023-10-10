package services

import (
	"errors"
	cst "github.com/qingyggg/storybook/server/constants"
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Behavior struct {
	DB *gorm.DB
}

func (b *Behavior) FollowStatus(followDto *dto.FollowDto) (bool, string) {
	ds := new(util.DbRes)
	follow := &models.Follow{
		UserID:     followDto.UserID,
		FollowedID: followDto.FollowedID,
	}
	result := b.DB.Model(&models.Follow{}).Where(follow).First(follow)
	return ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).AssignMessage([]string{cst.FOLLOW_RECORD, cst.FOLLOW_NORECORD}).ReturnInfo()
}

func (b *Behavior) Follow(followDto *dto.FollowDto) (bool, string) {
	follow := &models.Follow{
		UserID:     followDto.UserID,
		FollowedID: followDto.FollowedID,
	}
	err := b.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(follow).Error; err != nil {
			return err
		}
		b.followNumberModify(tx, followDto.UserID, followDto.FollowedID, "add")
		return nil
	})
	if err != nil {
		return false, cst.SERVER_ERR
	} else {
		return true, cst.FOLLOWING
	}
}

func (b *Behavior) Unfollow(followDto *dto.FollowDto) (bool, string) {
	follow := &models.Follow{
		UserID:     followDto.UserID,
		FollowedID: followDto.FollowedID,
	}
	err := b.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Unscoped().Where(follow).Delete(follow).Error; err != nil {
			return err
		}
		b.followNumberModify(tx, followDto.UserID, followDto.FollowedID, "delete")
		return nil
	})
	if err != nil {
		return false, cst.SERVER_ERR
	} else {
		return true, cst.UNFOLLOWING
	}
}

// debug this
func (b *Behavior) followNumberModify(tx *gorm.DB, uid uint, fid uint, signal string) error {
	preclause := tx.Model(&models.UserProfile{})
	preclause2 := tx.Model(&models.UserProfile{})
	um := new(models.UserProfile)
	fm := new(models.UserProfile)
	if err := preclause.Where("user_id=?", uid).Take(um).Error; err != nil {
		return err
	}
	if err := preclause2.Where("user_id=?", fid).Take(fm).Error; err != nil {
		return err
	}
	if signal == "add" {
		fm.FollowedNumber++
		um.FollowingNumber++
	} else if signal == "delete" {
		fm.FollowedNumber--
		um.FollowingNumber--
	} else {
		return errors.New("invalid signal couldnt as collectNumberModify's param")
	}
	return util.BatchSqlErrorReturner(tx.Save(um), tx.Save(fm))
}

func (b *Behavior) FollowingList(uid uint) (bool, *models.ApiFollowList) {
	ds := new(util.DbRes)
	list := &models.ApiFollowList{}
	result := b.DB.Table("follows").Select("user_profiles.user_id,user_profiles.name,user_profiles.description").Joins("left join user_profiles on  user_profiles.user_id = follows.followed_id").Where("follows.user_id = ?", uid).Scan(list)
	isSqlErr := ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).GetIsErr()
	return isSqlErr, list
}

func (b *Behavior) FollowedList(uid uint) (bool, *models.ApiFollowList) {
	ds := new(util.DbRes)
	list := &models.ApiFollowList{}
	result := b.DB.Table("follows").Select("user_profiles.user_id, user_profiles.name,user_profiles.description").Joins("left join user_profiles   on  user_profiles.user_id = follows.user_id").Where("follows.followed_id = ?", uid).Scan(list)
	isSqlErr := ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).GetIsErr()
	return isSqlErr, list
}

type FollowAmount struct {
	followingAmount uint
	followedAmount  uint
}

func (b *Behavior) FollowAmount(uid uint) (bool, *FollowAmount) {
	amount := new(FollowAmount)
	profile := &models.UserProfile{UserID: uid}
	result := b.DB.Model(&models.UserProfile{}).Select("following_number,followed_number").Where(profile).Take(profile)
	amount.followedAmount = profile.FollowedNumber
	amount.followingAmount = profile.FollowingNumber
	return util.CrudJudgement(result), amount
}
