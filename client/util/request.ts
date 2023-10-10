import { AxiosResponse } from 'axios';
import { instance } from './http';

export interface baseRes<T> {
  message: string;
  isError: boolean;
  data: T[] | T;
}

export const get = <T>(
  uri: string,
): Promise<AxiosResponse<baseRes<T>, any>> => {
  return instance.get(uri);
};
export const get2 = <T>(
  uri: string,
  body?: any,
): Promise<AxiosResponse<baseRes<T>, any>> => {
  let paramStr = '';
  if (body) {
    let isFirst = true;
    for (let i in body) {
      if (isFirst) {
        paramStr += '?';
        isFirst = false;
      }
      //?ArticleID=3
      paramStr += `${i}=${body[i]}&`;
    }
    paramStr = paramStr.slice(0, -1); //eliminate the end of the & symbol
  }
  return instance.get(uri + paramStr);
};
export const post = <T>(
  uri: string,
  body: any,
): Promise<AxiosResponse<baseRes<T>, any>> => {
  return instance.post(uri, body);
};
