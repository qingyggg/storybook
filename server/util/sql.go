package util

import "gorm.io/gorm"

// ctx input param, a output param
func CrudJudgement(ctx *gorm.DB) (a bool) {
	if ctx.Error == nil || ctx.RowsAffected > 0 {
		a = true
	} else {
		a = false
	}
	return
}
