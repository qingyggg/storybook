import {
  ARTICLE_LIST,
  ARTICLE_LIST_ERR,
  ARTICLE_DELETE,
  ARTICLE_DELETE_ERR,
  ARTICLE_CREATE,
  ARTICLE_CREATE_ERR,
  ARTICLE_EDIT,
  ARTICLE_EDIT_ERR,
} from './../../constants/messages/article';
import { articleI, articleEditI, articleDeleteI } from './reqTypes';
import { articleDetailI, articleListType } from './resTypes';
import { get, post } from '../../util/request';
import { alertInfoAttach } from '../../util/alert';
//use promise or async/await instead of callback
export const getArticleListApi = () => {
  return alertInfoAttach(
    (offset: number) => get<articleListType>('/article/list?offset=' + offset),
    ARTICLE_LIST,
    ARTICLE_LIST_ERR,
  );
};

export const getArticleDetailApi = () => {
  return alertInfoAttach(
    (articleID: number) =>
      get<articleDetailI>('/article/detail?/articleID' + articleID),
    ARTICLE_DELETE,
    ARTICLE_DELETE_ERR,
  );
};

export const postArticleCreateApi = () => {
  return alertInfoAttach(
    (article: articleI) => post('/article/create', article),
    ARTICLE_CREATE,
    ARTICLE_CREATE_ERR,
  );
};

export const postArticleEditApi = () => {
  return alertInfoAttach(
    (article: articleEditI) => post('/article/edit', article),
    ARTICLE_EDIT,
    ARTICLE_EDIT_ERR,
  );
};

export const postArticleDeleteApi = () => {
  return alertInfoAttach(
    (article: articleDeleteI) => post('/article/delete', article),
    ARTICLE_DELETE,
    ARTICLE_DELETE_ERR,
  );
};
