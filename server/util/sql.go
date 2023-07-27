package util

import (
	"github.com/qingyggg/storybook/server/constants"
	"gorm.io/gorm"
)

// old func,used to justify whether sql is okay(condition:ctx.Error == nil && ctx.RowsAffected > 0)
func CrudJudgement(ctx *gorm.DB) (a bool) {
	if ctx.Error == nil && ctx.RowsAffected > 0 {
		a = true
	} else {
		a = false
	}
	return
}

// new struct with series of methods,used to cope sql results
// isError != errType,errType is equal to sql results condition
type DbRes struct {
	ctx     sqlResults
	message string
	isError bool
	errType uint
}

type sqlResults struct {
	isSqlErr     bool
	rowsAffected int64
}

func (dr *DbRes) AssignResults(res *gorm.DB) *DbRes {
	if res.Error != nil {
		if res.Error.Error() != "record not found" {
			dr.ctx.isSqlErr = true
		} else {
			dr.ctx.isSqlErr = false
		}
	} else {
		dr.ctx.isSqlErr = false
	}
	dr.ctx.rowsAffected = res.RowsAffected
	return dr
}

func (dr *DbRes) ReturnDefaultInfo(res *gorm.DB) (bool, string) {
	if dr.errType == 1 { //rows.affected>0
		dr.message = "sql is okay"
		dr.isError = false
	} else {
		dr.isError = true
		dr.message = constants.SERVER_ERR
	}
	return dr.isError, dr.message
}

func (dr *DbRes) ReturnInfo() (isError bool, message string) {
	return dr.isError, dr.message
}

func (dr *DbRes) DistinguishSqlErrType() *DbRes {
	if dr.ctx.isSqlErr {
		dr.errType = 0
	} else if dr.ctx.rowsAffected > 0 { //sometimes this is okay,sometimes not
		dr.errType = 1
	} else {
		dr.errType = 2
	}
	return dr
}

func (dr *DbRes) AssignMessage(msg []string) *DbRes {
	if dr.errType == 0 {
		//sql err
		dr.message = constants.SERVER_ERR
	} else if dr.errType == 1 {
		//has record
		dr.message = msg[0]
	} else {
		//no record
		dr.message = msg[1]
	}
	return dr
}

func (dr *DbRes) AssignDefaultMessage(msg string) *DbRes {
	if dr.errType == 1 {
		dr.message = msg
	} else {
		dr.message = constants.SERVER_ERR
	}
	return dr
}

func (dr *DbRes) AssignDefaultsIsErr() *DbRes {
	if dr.errType == 1 { //rows.affected>0
		dr.isError = false
	} else {
		dr.isError = true
	}
	return dr
}

// [1,0],[0,1]-->0 is error,1 is correct for per errType
func (dr *DbRes) AssignIsErr(arr []uint) *DbRes {
	switch dr.errType {
	case 0:
		dr.isError = true
	case 1:
		if dr.errType == arr[0] {
			dr.isError = false
		} else {
			dr.isError = true
		}
	case 2:
		if dr.errType == arr[1]+1 {
			dr.isError = false
		} else {
			dr.isError = true
		}
	}
	return dr
}
func (dr *DbRes) GetErrType() uint {
	return dr.errType
}

func (dr *DbRes) GetIsErr() (isError bool) {
	isError = dr.isError
	return
}
