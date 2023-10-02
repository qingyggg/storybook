import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';

export const useAlert = (
  defaultInfo: stateI = {
    info: 'info',
    message: 'congratulations!this is a hidden Info',
  },
): [() => void, (newInfo: stateI) => void] => {
  const [, setState] = useRecoilState(alertState);
  let alertInfo = defaultInfo;
  const openAlert = () => {
    console.log(777);
    setState({ ...alertInfo, open: true });
  };
  const setAlertInfo = (newInfo: stateI) => {
    alertInfo = newInfo;
  };
  return [openAlert, setAlertInfo];
};

interface stateI {
  info: 'error' | 'warning' | 'info' | 'success';
  message: string;
}
