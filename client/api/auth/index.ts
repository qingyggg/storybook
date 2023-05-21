import { post } from '../../util/request';
import { authI } from './reqTypes';

export const generateNewTokenApi = (auth: authI) => () =>
  post<string>('/auth/generateNewToken', auth);
export const updateTokenApi = () => post('/auth/updateToken', null);
