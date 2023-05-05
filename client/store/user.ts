import { atom } from 'recoil';

interface UserStateI {
  ID: number;
}
export const userState = atom<UserStateI>({
  key: 'userState',
  default: { ID: 0 },
});
