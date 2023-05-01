import { AxiosResponse } from 'axios';
import { instance } from './http';

export interface baseRes<T> {
  message: string;
  isError: boolean;
  data: T;
}

export const get = <T>(
  uri: string,
): Promise<AxiosResponse<baseRes<T>, any>> => {
  return instance.get(uri);
};

export const post = <T>(
  uri: string,
  body: any,
): Promise<AxiosResponse<baseRes<T>, any>> => {
  return instance.post(uri, body);
};
