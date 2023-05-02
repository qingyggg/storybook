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
//new struct with series of methods,used to cope sql results
type DbRes struct{
	ctx sqlResults
	message string
	isError bool
	errType uint
}

type sqlResults struct{
	isSqlErr bool
	rowsAffected int64
}

func (dr *DbRes) AssignResults(res *gorm.DB) *DbRes{
	if res.Error!=nil{
		dr.ctx.isSqlErr=true
	}else{
		dr.ctx.isSqlErr=false
	}
	dr.ctx.rowsAffected=res.RowsAffected
	return dr
}

func (dr *DbRes) ReturnInfo() (bool,string){
	return dr.isError,dr.message
}

func (dr *DbRes) DistinguishSqlErrType() *DbRes{
	if(dr.ctx.isSqlErr){
		dr.errType=0
	}else if(dr.ctx.rowsAffected>0){//sometimes this is okay,sometimes not
		dr.errType=1
	}else{
		dr.errType=2
	}
	return dr
}

func (dr *DbRes) AssignMessage(msg []string) *DbRes{
	if(dr.errType==0){
		dr.message= constants.SERVER_ERR
	}else if(dr.errType==1){
		dr.message= msg[0]
	}else{
		dr.message= msg[1]
	}
	return dr
}

//[1,0],[0,1]-->0 is error,1 is correct for per errType
func (dr *DbRes) AssignIsErr(arr []uint) *DbRes{
	switch dr.errType{
		case 0:
			dr.isError=true
		case 1: 
			if(dr.errType==arr[0]){
				dr.isError=false
			}else {
				dr.isError=true
			}		
		case 2:
			if(dr.errType==arr[1]+1){
				dr.isError=false
			}else {
				dr.isError=true
			}				
		}
	return dr	
}

