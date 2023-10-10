package util

import (
	"gorm.io/gorm"
	"log"
	"strconv"
)

// StringConvertToUint for parse queryString like id(default string)
func StringConvertToUint(sVal string) uint {
	uVal, err := strconv.ParseUint(sVal, 10, 64)
	if err != nil {
		log.Fatalln("the param must can be parsed int and the value mustn't smaller than 0!!!")
	}
	return uint(uVal)
}

func SqlErrorReturner(tx *gorm.DB) error {
	if err := tx.Error; err != nil {
		return err
	} else {
		return nil
	}
}

func BatchSqlErrorReturner(txs ...*gorm.DB) error {
	for i := 0; i < len(txs); i++ {
		err := SqlErrorReturner(txs[i])
		if err != nil {
			return err
		}
	}
	return nil
}
