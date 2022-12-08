package dto

type ProfileDto struct{
	Name string 
	Age      uint8
	Avatar []byte
	Description string
  Contact 
}
type Contact struct{
	Github string
	WeChat string
	Twitter string
}