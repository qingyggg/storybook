import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';
import useStatelessStorage from './useStatelessStorage';

const useClientAuth = () => {
  const [userId] = useStatelessStorage('userId');
  const router = useRouter();
  const [, setAlsState] = useRecoilState(alertState);
  let blackList: string[] = [];
  //when token expired
  //profile->routerAttach success->request->authentication failed->login->profile->routerAttach failed->login
  //recoil set router pathname,and write plus version of router.push
  //TODO:test this
  // useEffect(() => {
  //   blackList.forEach((e) => {
  //     const regex = new RegExp(e);
  //     const b = regex.test(router.pathname);
  //     if (b) {
  //       //authentication according userId.whether userId===''
  //       if (userId() === '') {
  //         router.push('/login');
  //       }
  //     }
  //   });
  // }, [router.pathname]);
  const routerAttach = (rs: string[]) => {
    blackList = rs;
  };
  const onClientAuth = (sucCb: () => any) => {
    if (!userId()) {
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
