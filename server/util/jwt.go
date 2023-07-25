package util

import (
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	cst "github.com/qingyggg/storybook/server/constants"
	"net/http"
	"os"
	"time"
)

var BlackList = []string{"/article/create", "/article/edit", "/article/delete", "/auth/modifyPwd", "/comment/create", "/comment/delete", "/comment/like", "/profile/show", "/profile/edit"}

type User struct {
	UserId               string `json:"username"`
	jwt.RegisteredClaims        // v5版本新加的方法
}

func GenerateJWT(userId string, secretKey string) (string, error) {
	claims := User{
		userId,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour * 5)), // 过期时间5 days
			IssuedAt:  jwt.NewNumericDate(time.Now()),                         // 签发时间
			NotBefore: jwt.NewNumericDate(time.Now()),                         // 生效时间
		},
	}
	// 使用HS256签名算法
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	s, err := t.SignedString([]byte(secretKey))

	return s, err
}

func VerifyJwt(ctx *gin.Context, secretKey string) {
	data, err := ctx.Cookie("token")
	if err != nil {
		t, err := jwt.ParseWithClaims(data, &User{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(secretKey), nil
		})
		if err != nil {
			errResponseByAuthorization(ctx)
		} else {
			if claims, ok := t.Claims.(*User); ok && t.Valid {
				//test
				difference := claims.RegisteredClaims.ExpiresAt.Sub(time.Now())
				if diffDays := int64(difference.Hours() / 24); diffDays <= 2 {
					//set token in cookie,ctx is pointer
					_, err := TokenHandler(claims.UserId, ctx)
					if err != nil {
						Response(ctx, false, nil)
					}
				}
			} else {
				errResponseByAuthorization(ctx)
			}
		}
	} else {
		errResponseByAuthorization(ctx)
	}
}

func errResponseByAuthorization(ctx *gin.Context) {
	ctx.JSON(http.StatusUnauthorized, gin.H{"message": cst.AUTHENTICATION_FAILED, "isError": true, "data": nil})
}

func TokenHandler(userId string, c *gin.Context) (*gin.Context, error) {
	token, err := GenerateJWT(userId, os.Getenv("SECRET_KEY"))
	if err != nil {
		return nil, errors.New("generate new token false")
	} else {
		c.SetCookie("token", token, 60*60*24*5, "/", "localhost", false, true)
		return c, nil
	}
}
