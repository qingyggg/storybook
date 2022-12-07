package services

type Comment struct{

}

func (c *Comment) Create(userID uint,articleID uint,content string){

}
//jwt-->article owner,comment user
func (c *Comment) Delete(commentID uint){

}
//jwt-->comment user
func (c *Comment) Edit(commentID uint,content string){

}

func (c *Comment) Like(userID uint){

}