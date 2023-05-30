package util

import (
	"fmt"
	"log"
	"strconv"
)

// StringConvertToUint for parse queryString like id(default string)
func StringConvertToUint(sVal string) uint {
	uVal, err := strconv.ParseUint(sVal, 10, 64)
	fmt.Print(sVal)
	if err != nil {
		log.Fatalln("the param must can be parsed int and the value mustn't smaller than 0!!!")
	}
	return uint(uVal)
}
