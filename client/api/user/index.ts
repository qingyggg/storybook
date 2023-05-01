import {
  LOGIN,
  LOGIN_ERR,
  REGISTER,
  REGISTER_FAILED,
  MODIFY,
  MODIFY_ERR,
  PROFILE,
  PROFILE_ERR,
  PROFILE_CREATE,
  PROFILE_CREATE_ERR,
  PROFILE_EDIT,
  PROFILE_EDIT_ERR,
} from './../../constants/messages/user';
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
  return alertInfoAttach(() => post('/auth/login', auth), LOGIN, LOGIN_ERR);
};

export const registerApi = (auth: registerI) => {
  return alertInfoAttach(
    () => post('/auth/register', auth),
    REGISTER,
    REGISTER_FAILED,
  );
};

export const modifyApi = (auth: modifyT) => {
  return alertInfoAttach(
    () => post('/auth/modifyPwd', auth),
    MODIFY,
    MODIFY_ERR,
  );
};

export const showProfileApi = (id: userIdT) => {
  return alertInfoAttach(
    () => get<showProfileI>('/profile/show?userId=' + id),
    PROFILE,
    PROFILE_ERR,
  );
};
//this api only been executed once for per user
export const createProfileApi = (profile: profileI) => {
  return alertInfoAttach(
    () => post('/profile/create', profile),
    PROFILE_CREATE,
    PROFILE_CREATE_ERR,
  );
};

export const editProfileApi = (profile: editProfileI) => {
  return alertInfoAttach(
    () => post('profile/edit', profile),
    PROFILE_EDIT,
    PROFILE_EDIT_ERR,
  );
};
