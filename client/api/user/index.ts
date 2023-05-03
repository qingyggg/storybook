import { alertInfoAttach } from '../../util/alert';
import { get, post } from '../../util/request';
import {
  loginI,
  modifyT, 
  registerI,
  profileI,
  userIdT,
  editProfileI,
} from './reqTypes';
import { showProfileI } from './resTypes';
export const loginApi = (auth: loginI) => {
  return () => post('/auth/login', auth)
};

export const registerApi = (auth: registerI) => {
  return () => post('/auth/register', auth)
};

export const modifyApi = (auth: modifyT) => {
  return () => post('/auth/modifyPwd', auth)
};

export const showProfileApi = (id: userIdT) => {
  return () => get<showProfileI>('/profile/show?userId=' + id)
};
//this api only been executed once for per user
export const createProfileApi = (profile: profileI) => {
  return  () => post('/profile/create', profile)
};

export const editProfileApi = (profile: editProfileI) => {
  return () => post('profile/edit', profile)
};
