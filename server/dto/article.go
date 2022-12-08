package dto

//dto used for all post request
type ArticleDto struct{
	UserID uint
	Title       string
	Description string
	Content     string
}

type ArticleDtoForEdit struct{
	ArticleID uint
	ArticleDto
}

//use JWT judge whether the user has admission for delete Article
type ArticleDtoForDelete struct{
	ArticleID uint
}