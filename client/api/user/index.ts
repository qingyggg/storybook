import { get, post } from '../../util/request';
import {
  AuthJwt,
  editProfileI,
  loginI,
  modifyT,
  registerI,
  userIdT,
} from './reqTypes';
import { showProfileI } from './resTypes';
import auth from '@/components/Auth';

export const loginApi = (auth: loginI) => {
  return () => post<string>('/auth/login', auth);
};

export const registerApi = (auth: registerI) => {
  return () => post<string>('/auth/register', auth);
};

export const modifyApi = (auth: modifyT) => {
  return () => post('/auth/modifyPwd', auth);
};

export const showProfileApi = (id: userIdT) => {
  return () => get<showProfileI>('/profile/show?userId=' + id);
};

export const editProfileApi = (profile: editProfileI) => {
  return () => post('profile/edit', profile);
};

export const logoutApi = (auth: AuthJwt) => {
  return () => post('/auth/logout', auth);
};
