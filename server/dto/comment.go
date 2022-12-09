package dto

type CommentDtoForCreate struct{
	UserID uint
	ArticleID uint
	Content string
}

type CommentDtoForEdit struct{
	ID uint
	CommentDtoForCreate
}

type CommentDtoForDelete struct{
	ID uint
}

type LikeDto struct{
	ArticleID uint
	UserID uint
}

type DisLikeDto struct{
	ID uint
}