import { AxiosResponse } from 'axios';
import { instance } from './http';

//TODO:add base response type-->baseRes<T>
//{"message":string,"isError":bool,"data":T}
interface baseRes<T> {
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
