import { post } from '../../util/request';
import { authI } from './reqTypes';

export const generateNewTokenApi = (auth: authI) => () =>
  post<string>('/generateNewToken', auth);
export const updateTokenApi = () => post('/updateToken', null);
