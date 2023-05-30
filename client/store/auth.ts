import { atom } from 'recoil';

export const authState = atom<stateI>({
  key: 'authState',
  default: { Email: '', Password: '' },
});

interface stateI {
  Email: string;
  Password: string;
}
