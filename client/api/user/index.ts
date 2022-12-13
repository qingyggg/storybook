import { get, post } from '../../util/request';
import { loginI, modifyT, registerI, profileI, userIdT, editProfileI } from './reqTypes';
export const login = async (auth: loginI) => {
  return post("/auth/login",auth)  
} 

export const register = async (auth: registerI) => { 
  return post("/auth/register",auth)
}

export const modify = async (auth: modifyT) => {
  return post("/auth/modifyPwd",auth)
}

export const showProfile = async (id: userIdT) => { 
  return get("/profile/show?userId="+id)
}
//this api only been executed once for per user
export const createProfile = async (profile: profileI) => {
  return post("/profile/create",profile)
}

export const editProfile = async (profile: editProfileI) => {
  return post("profile/edit",profile)
}