package services

type Profile struct{

}

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

func (p *Profile) Show(userID uint){

}

func (p *Profile) Edit(userID uint,profile ProfileDto){

}

func (p *Profile) Create(userID uint,profile ProfileDto){

}