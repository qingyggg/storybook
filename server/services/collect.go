package services

import (
	"errors"
	cst "github.com/qingyggg/storybook/server/constants"
	"github.com/qingyggg/storybook/server/db/models"
	"github.com/qingyggg/storybook/server/dto"
	"github.com/qingyggg/storybook/server/util"
	"gorm.io/gorm"
)

type Collect struct {
	DB *gorm.DB
}

func (c *Collect) Collect(collectDto *dto.CollectDto) (bool, string) {
	collect := &models.Collect{
		UserID:    collectDto.UserID,
		ArticleID: collectDto.ArticleID,
	}
	err := c.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(collect).Error; err != nil {
			return err
		}
		if err := c.collectNumberModify(tx, collectDto.ArticleID, "add"); err != nil {
			return err
		}
		return nil
	})
	if err == nil {
		return true, cst.COLLECT
	} else {
		return false, cst.SERVER_ERR
	}
}

func (c *Collect) UnCollect(collectDto *dto.CollectDto) (bool, string) {
	collect := &models.Collect{
		UserID:    collectDto.UserID,
		ArticleID: collectDto.ArticleID,
	}
	err := c.DB.Transaction(func(tx *gorm.DB) error {
		if err := tx.Unscoped().Where(collect).Delete(&models.Collect{}).Error; err != nil {
			return err
		}
		c.collectNumberModify(tx, collectDto.ArticleID, "delete")
		return nil
	})
	if err == nil {
		return true, cst.UNCOLLECT
	} else {
		return false, cst.SERVER_ERR
	}
}
func (c *Collect) CollectShow(collectDto *dto.CollectDto) (bool, string) {
	ds := new(util.DbRes)
	collect := &models.Collect{
		ArticleID: collectDto.ArticleID,
		UserID:    collectDto.UserID,
	}
	result := c.DB.Model(&models.Collect{}).Where(collect).First(collect)
	return ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).AssignMessage([]string{cst.COLLECT_RECORD, cst.COLLECT_NORECORD}).ReturnInfo()
}
func (c *Collect) collectNumberModify(tx *gorm.DB, aid uint, signal string) error {
	preClause := tx.Model(&models.Article{}).Where("id=?", aid)
	var newClause *gorm.DB
	if signal == "add" {
		newClause = preClause.UpdateColumn("collect_number", gorm.Expr("collect_number + ?", 1))
	} else if signal == "delete" {
		newClause = preClause.UpdateColumn("collect_number", gorm.Expr("collect_number - ?", 1))
	} else {
		return errors.New("invalid signal couldnt as collectNumberModify's param")
	}
	return newClause.Error
}

func (c *Collect) List(uid uint) (bool, *models.ApiArticleList) {
	ds := new(util.DbRes)
	list := &models.ApiArticleList{}
	//result := c.DB.Table("collects").Select("collects.article_id,collects.user_id,a.title article_name,p.name user_name").Joins("left join user_profiles p on p.user_id = collects.user_id").Joins("left join articles a on a.id = collects.article_id").Where("collects.user_id = ?", uid).Scan(list)
	result := c.DB.Model(&models.Article{}).Joins("left join collects on collects.article_id=articles.id").Where("collects.user_id=?", uid).Scan(list)
	isSqlErr := ds.AssignResults(result).DistinguishSqlErrType().AssignIsErr([]uint{1, 1}).GetIsErr()
	return isSqlErr, list
}
