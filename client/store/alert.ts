import { atom, selector } from 'recoil';

export const alertState = atom<aleStateI>({
  key: 'alertState',
  default: { info: 'info', message: '', open: false },
});

export const alertOpenState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const state = get(alertState);
    return state.open;
  },
});

export interface aleStateI {
  info: 'error' | 'warning' | 'info' | 'success';
  message: string;
  open: boolean;
}
