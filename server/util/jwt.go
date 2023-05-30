package util

import (
	"errors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	cst "github.com/qingyggg/storybook/server/constants"
	"net/http"
	"time"
)

var secretKey = []byte("AliceMarisaCouplesWen")
var BlackList = []string{"/article/create", "/article/edit", "/article/delete", "/auth/modifyPwd", "/comment/create", "/comment/delete", "/comment/like", "/profile/show", "/profile/edit"}

func GenerateJWT(userId string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["exp"] = time.Now().Add(12 * 8 * time.Hour)
	claims["authorized"] = true
	claims["userId"] = userId

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyJwt(ctx *gin.Context) {
	if ctx.GetHeader("Authorization") != "" {
		jwt.Parse(ctx.GetHeader("Authorization"), func(token *jwt.Token) (interface{}, error) {
			_, ok := token.Method.(*jwt.SigningMethodHMAC)
			if !ok {
				errResponseByAuthorization(ctx)
			} else {
				if !token.Valid {
					errResponseByAuthorization(ctx)
				}
			}
			return "", nil
		})
	} else {
		errResponseByAuthorization(ctx)
	}
}

func ExtractClaims(ctx *gin.Context) (string, error) {
	if ctx.GetHeader("Authorization") != "" {
		tokenString := ctx.GetHeader("Authorization")
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodECDSA); !ok {
				return nil, fmt.Errorf("there's an error with the signing method")
			}
			return secretKey, nil
		})
		if err != nil {
			return "Error Parsing Token: ", err
		} else {
			claims, ok := token.Claims.(jwt.MapClaims)
			if ok && token.Valid {
				userId := claims["userId"].(string)
				return userId, nil
			} else {
				return "", errors.New("unable to extract claims")
			}
		}
	} else {
		return "", errors.New("unable to extract claims")
	}
}

func errResponseByAuthorization(ctx *gin.Context) {
	ctx.JSON(http.StatusUnauthorized, gin.H{"message": cst.AUTHENTICATION_FAILED, "isError": true, "data": nil})
}
