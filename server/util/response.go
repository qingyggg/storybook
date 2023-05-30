package util

import (
	"net/http"

	"github.com/gin-gonic/gin"
	cst "github.com/qingyggg/storybook/server/constants"
)

type ResPayload struct {
	message string
	isError bool
	data    interface{}
}

func (res *ResPayload) Set(payload *ResPayload) *ResPayload {
	res.message = payload.message
	res.isError = payload.isError
	res.data = payload.data
	return res
}

func (res *ResPayload) SetDefault(isError bool, data interface{}) *ResPayload {
	res.isError = isError
	if !isError {
		res.message = cst.REQ_OK
	} else {
		res.message = cst.SERVER_ERR
	}
	res.data = data
	return res
}

func (res *ResPayload) SetMessage2(correctMsg string) *ResPayload {
	if res.isError {
		res.message = cst.SERVER_ERR
	} else {
		res.message = correctMsg
	}
	return res
}

func (res *ResPayload) SetMessage(message string) *ResPayload {
	res.message = message
	return res
}

func (res *ResPayload) SetIsError(isError bool) *ResPayload {
	res.isError = isError
	return res
}

func (res *ResPayload) SetData(data interface{}) *ResPayload {
	res.data = data
	return res
}

func (res *ResPayload) SetDefaultMsg(isError bool) *ResPayload {
	if !isError {
		res.message = cst.REQ_OK
	} else {
		res.message = cst.SERVER_ERR
	}
	return res
}

func (res *ResPayload) Response(ctx *gin.Context) {
	var status int
	if res.isError {
		if res.message == cst.SERVER_ERR {
			status = http.StatusInternalServerError
		} else {
			status = http.StatusBadRequest
		}
	} else {
		status = http.StatusAccepted
	}
	ctx.JSON(status, gin.H{"message": res.message, "isError": res.isError, "data": res.data})
}
