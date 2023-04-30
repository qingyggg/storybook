import { atom } from 'recoil';

export const alertState = atom<string>({
  key: 'userState',
  default: '',
});
