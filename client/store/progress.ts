import {atom} from 'recoil';

export const progressState = atom<boolean>({
  key: 'progressState',
  default: false,
});


