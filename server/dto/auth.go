package dto

//dto for all post request
type AuthDto struct{
	Email    string 
	Password string
}

type AuthDtoForModify struct{
	ID uint
	AuthDto
}
 