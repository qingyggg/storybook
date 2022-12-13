export interface loginI{
  Email    :string 
	Password :string
}

export interface registerI{
  ID       :number
  Email    :string 
	Password :string
}

export type modifyT = registerI
//for showProfile() api
export type userIdT=number

export interface profileI{
  Name        :string
	Age         :number
	Avatar      :any[]
	Description :string
	Github      :string
	WeChat      :string
	Twitter     :string
}

export interface editProfileI extends profileI{
	ID :number
}

export interface deleteProfileI{
	ID :number
}