import useLocalStorage from './useLocalStorage';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';

const useClientAuth = () => {
  const [userId] = useLocalStorage('userId');
  const router = useRouter();
  const [, setAlsState] = useRecoilState(alertState);
  let blackList: string[] = [];
  useEffect(() => {
    blackList.forEach((e) => {
      const regex = new RegExp(e);
      regex.test(router.pathname);
    });
  }, [router]);
  const routerAttach = (rs: string[]) => {
    blackList = rs;
  };
  const onClientAuth = (sucCb: () => any) => {
    if (!userId) {
      setAlsState({
        info: 'warning',
        message: 'please login or register at first',
        open: true,
      });
      router.push('/login');
    } else {
      sucCb();
    }
  };
  return { routerAttach, onClientAuth };
};

export default useClientAuth;
