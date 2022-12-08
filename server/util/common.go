package util

import (
	"log"
	"strconv"
)
//these function are common util function for save more code

//for parse queryString like id(default string)
func StringConvertToUint(sVal string) uint{
			//TODO: key word,label select
			uVal, err := strconv.ParseUint(sVal, 10, 64)
			if err != nil {
				log.Fatalln("the param must can be parsed int and the value must bigger than 0!!!")
			}
			return uint(uVal)
}