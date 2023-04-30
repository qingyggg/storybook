import { atom } from 'recoil';

interface UserStateI {
  ID: number;
  Avatar: string;
  Description: string;
}
export const userState = atom<UserStateI>({
  key: 'userState',
  default: { ID: 0, Avatar: '', Description: 'Im alice' },
});
