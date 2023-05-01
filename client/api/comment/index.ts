import {
  LIKE,
  LIKE_ERR,
  COMMENT,
  COMMENT_ERR,
  COMMENT_DELETE,
  COMMENT_DELETE_ERR,
  COMMENT_EDIT,
} from './../../constants/messages/comment';
import { alertInfoAttach } from '../../util/alert';
import { likeI, commentI, commentDeleteI, commentEditI } from './reqTypes';
import { post, get } from '../../util/request';
export const postLike = (like: likeI) => {
  return alertInfoAttach(() => post('/comment/like', like), LIKE, LIKE_ERR);
};

export const postCommentApi = (comment: commentI) => {
  return alertInfoAttach(
    () => post('/comment/create', comment),
    COMMENT,
    COMMENT_ERR,
  );
};

export const postCommentEditApi = (comment: commentEditI) => {
  return alertInfoAttach(
    () => post('/comment/edit', comment),
    COMMENT_EDIT,
    COMMENT_DELETE_ERR,
  );
};

export const postCommentDeleteApi = (comment: commentDeleteI) => {
  return alertInfoAttach(
    () => post('/comment/delete', comment),
    COMMENT_DELETE,
    COMMENT_DELETE_ERR,
  );
};
