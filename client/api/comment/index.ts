import {
  likeI,
  commentI,
  commentDeleteI,
  commentEditI,
  collectI,
} from './reqTypes';
import { post, get } from '../../util/request';
import { collectStatus, commentListT, likeStatus } from './resTypes';
import { articleListType } from '@/api/article/resTypes';
export const postLike = (like: likeI) => () =>
  post<likeStatus>('/comment/like', like);
export const postLikeStatus = (like: likeI) => () =>
  post<likeStatus>('/comment/likeStatus', like);
export const postCommentApi = (comment: commentI) => () =>
  post('/comment/create', comment);
export const postCommentEditApi = (comment: commentEditI) => () =>
  post('/comment/edit', comment);
export const postCommentDeleteApi = (comment: commentDeleteI) => () =>
  post('/comment/delete', comment);
export const getCommentListApi = (ArticleId: number) => () =>
  get<commentListT>('/comment/list?ArticleId=' + ArticleId);
export const getMyCommentListApi = (userId: string) => () =>
  get<commentListT>('/comment/mylist?UserId=' + userId);
export const postCollect = (collect: collectI) => () =>
  post<collectStatus>('/comment/collect', collect);
export const postCollectStatus = (collect: collectI) => () =>
  post<collectStatus>('/comment/collectStatus', collect);
export const getMyCollectListApi = (userId: string) => () =>
  get<articleListType>('/comment/collectList?uid=' + userId);
