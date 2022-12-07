package services

type Article struct{

}
type ArticleDto struct{
	Title       string
	Description string
	Content     string
}
//TODO: label,keyword
func (a *Article) List(offset uint){

}
func (a *Article) Detail(articleID uint){

}
func (a *Article) Create(article ArticleDto){

}

func (a *Article) Edit(ArticleID uint,article ArticleDto){

}

func (a *Article) Delete(ArticleID uint){

}