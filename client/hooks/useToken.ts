import useLocalStorage from './useLocalStorage';
import { useRequest } from './useRequest';
import { generateNewTokenApi, updateTokenApi } from '../api/auth';
import { useCallback, useEffect, useState } from 'react';
import { authI } from '../api/auth/reqTypes';
import { useRouter } from 'next/router';
import useStatelessStorage from './useStatelessStorage';

export default function useToken() {
  const router = useRouter();
  const [auth, setAuth] = useState<authI>(defaultAuth);
  const [token, setTokenStorage] = useStatelessStorage('token');
  const [userId] = useStatelessStorage('userId');
  const [tokenGenerateSignal, setTokenGenerateSignal] =
    useState<boolean>(false);
  //original token from header
  const tokenUpdateReq = useRequest(
    updateTokenApi,
    (t) => {
      setTokenStorage(t);
    },
    () => {
      router.push('/login');
    },
  );
  const tokenGenerateReq = useRequest<string>(
    generateNewTokenApi(auth),
    (t) => {
      setTokenStorage(t);
    },
    () => {
      router.push('/login');
    },
  );
  useEffect(() => {
    return () => {
      if (tokenGenerateSignal) {
        tokenGenerateReq();
      }
    };
  }, [auth, tokenGenerateSignal]);
  const updateToken = async () => {
    if (token() !== '') {
      await (
        await tokenUpdateReq
      )();
    } else {
      return new Promise((res, rej) => {
        rej('token in localstorage is empty');
      });
    }
  };
  const generateToken = async () => {
    if (userId() !== '') {
      setAuth({ UserId: userId() });
      setTokenGenerateSignal(true);
    } else {
      //!!!
      return new Promise((res, rej) => {
        rej('userId in localstorage is empty');
      });
    }
  };
  return { updateToken, generateToken };
}
const defaultAuth: authI = { UserId: '' };
