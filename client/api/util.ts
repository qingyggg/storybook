import { AxiosResponse } from 'axios';
import { baseRes } from '../util/request';
import { getArticleListApi } from './article';

export function getApiArgument<T, R>(api: apiType<T, R>, argument: R) {
  return [argument];
}
type apiType<T, R> = (p: R) => () => Promise<AxiosResponse<baseRes<T>, any>>;

getApiArgument(getArticleListApi, 3);
