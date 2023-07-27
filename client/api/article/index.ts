import { articleI, articleEditI, articleDeleteI } from './reqTypes';
import { articleDetailI, articleListType } from './resTypes';
import { get, post } from '../../util/request';

export const getArticleCount = () => {
  return () => get<number>('/article/count');
};

export const getArticleListApi = (offset: number) => {
  return () => get<articleListType>('/article/list?offset=' + offset);
};

export const getMyArticleApi = (uid: string) => {
  return () => get<articleListType>('/article/mylist?uid=' + uid);
};

export const getArticleDetailApi = (articleID: number) => {
  return () => get<articleDetailI>('/article/detail?articleID=' + articleID);
};

export const postArticleCreateApi = (article: articleI) => {
  return () => post('/article/create', article);
};

export const postArticleEditApi = (article: articleEditI) => {
  return () => post('/article/edit', article);
};

export const postArticleDeleteApi = (article: articleDeleteI) => {
  return () => post('/article/delete', article);
};
