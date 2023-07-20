import { likeI, commentI, commentDeleteI, commentEditI } from './reqTypes';
import { post, get } from '../../util/request';
import { commentListT } from './resTypes';
export const postLike = (like: likeI) => () => post('/comment/like', like);
export const postHate = (like: likeI) => () => post('/comment/dislike', like);
export const postCommentApi = (comment: commentI) => () =>
  post('/comment/create', comment);
export const postCommentEditApi = (comment: commentEditI) => () =>
  post('/comment/edit', comment);
export const postCommentDeleteApi = (comment: commentDeleteI) => () =>
  post('/comment/delete', comment);
export const getCommentListApi = (ArticleId: number) => () =>
  get<commentListT>('/comment/list?ArticleId=' + ArticleId);
export const getMyCommentListApi = (userId: string) => () =>
  get<commentListT>('/comment/mylist?userId=' + userId);
