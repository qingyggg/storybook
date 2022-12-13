import { likeI, commentI, commentDeleteI, commentEditI } from './reqTypes';
import { post, get } from '../../util/request';
export const postLike =async (like:likeI) => { 
  return await post('/comment/like',like)
}

export const postComment =async (comment:commentI) => { 
  return await post('/comment/create',comment)
}

export const postCommentEdit =async (comment:commentEditI) => {
  return await post('/comment/create',comment)
}

export const postCommentDelete =async (comment:commentDeleteI) => {
  return await post('/comment/edit',comment)
} 




