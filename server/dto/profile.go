package dto

type UserProfileDto struct {
	Name        string
	Age         uint8
	Avatar      []byte
	Description string
	Github      string
	WeChat      string
	Twitter     string
}
type UserProfileDtoForEdit struct {
	ID uint
	UserProfileDto
}
