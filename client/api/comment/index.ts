import { LIKE, LIKE_ERR, COMMENT, COMMENT_ERR, COMMENT_DELETE, COMMENT_DELETE_ERR, COMMENT_EDIT } from './../../constants/messages/comment';
import { alertInfoAttach } from './../../util/funs';
import { likeI, commentI, commentDeleteI, commentEditI } from './reqTypes';
import { post, get } from '../../util/request';
export const postLike = (like:likeI) => { 
  return  alertInfoAttach(()=>post('/comment/like',like),LIKE,LIKE_ERR) 
}

export const postComment = (comment:commentI) => { 
  return  alertInfoAttach(()=>post('/comment/create',comment),COMMENT,COMMENT_ERR) 
}

export const postCommentEdit = (comment:commentEditI) => {
  return  alertInfoAttach(()=>post('/comment/edit',comment),COMMENT_EDIT,COMMENT_DELETE_ERR) 
}

export const postCommentDelete = (comment:commentDeleteI) => {
  return  alertInfoAttach(()=>post('/comment/delete',comment),COMMENT_DELETE,COMMENT_DELETE_ERR) 
} 




