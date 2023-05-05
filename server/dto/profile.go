package dto

type UserProfileDto struct {
	Name        string 
	Age         uint8
	Avatar      []byte
	Description string
	Github      string
	Twitter     string
}
type UserProfileDtoForEdit struct {
	UserId uint
	UserProfileDto
}
