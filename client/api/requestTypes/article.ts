export interface articleCreateI{
  UserID :number
	Title       :string
	Description :string
	Content     :string
}

export interface articleEditI{
  ArticleID: number
  Title       :string
	Description :string
	Content     :string
}

export interface articleDeleteI{
  ArticleID: number
}