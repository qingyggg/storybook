interface articleItemForListI{
  ID: string
  Title: string
  Description: string
  Likes:any[]
}

export type articleListType=articleItemForListI[]

export interface articleDetailI{
  ID          :number
	Title       :string
	Description :string
	Content     :string
	UserID      :number
	Comments    :any[]
	Likes       :any[]
} 