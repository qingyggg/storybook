//used for logout or token expired
import { useRouter } from 'next/router';
import { useRequest } from './useRequest';
import { editProfileApi, logoutApi } from '@/api/user';
import useLocalStorage from './useLocalStorage';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';
import { useAlert } from './useAlert';

const useLogout = () => {
  const router = useRouter();
  const [v] = useLocalStorage('userId');
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [open, setInfo] = useAlert();
  const logout = logoutApi({ UserId: v });
  useMemo(async () => {
    if (isLogout) {
      const { data } = await logout();
      setInfo({ info: 'success', message: data.message });
      open();
      localStorage.removeItem('userId');
      router.push('/login');
    }
  }, [isLogout]);

  return () => {
    setIsLogout(true);
  };
};
export default useLogout;
