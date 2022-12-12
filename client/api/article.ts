import { articleCreateI, articleEditI, articleDeleteI } from './requestTypes/article';
import { articleListType, articleDetailI } from './responsetypes/article';
import { get, post } from './../util/request';
import { AxiosResponse } from 'axios';
//use promise or async/await instead of callback
export const getArticleList = async (offset: number):Promise<AxiosResponse<articleListType, any>>=> { 
  return await get("/article/list?offset=" + offset)
}

export const getArticleDetail =async (articleID:number):Promise<AxiosResponse<articleDetailI, any>>=> {
  return await get("/article/detail?/articleID"+articleID)
}

export const postArticleCreate = async (article:articleCreateI) => { 
  return await post("/article/create",article)
}

export const postArticleEdit =async (article:articleEditI) => { 
  return await post("/article/edit",article)
}

export const postArticleDelete =async (article:articleDeleteI) => {
  return await post("/article/delete",article)
}
