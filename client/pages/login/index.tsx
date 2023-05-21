import React, { useEffect, useState } from 'react';
import Auth from '../../components/Auth';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { loginApi } from '../../api/user';
import { usePassword } from '../../hooks/usePassword';
import { useRequest } from '../../hooks/useRequest';
import useLocalStorage from '../../hooks/useLocalStorage';
import useToken from '../../hooks/useToken';
import { useRecoilState } from 'recoil';
import { authState } from '../../store/auth';

function Login() {
  const router = useRouter();
  const [Email, setEmail] = useState('');
  const [Password, setPassword, cryptedPwdByMd5] = usePassword();
  const [, setUserId] = useLocalStorage('userId');
  const [auth, setAuth] = useRecoilState(authState);
  const { generateToken } = useToken();
  //synchronize atom state to this component state
  useEffect(() => {
    setEmail(auth.Email);
    setPassword(auth.Password);
  }, []);
  const loginReq = useRequest(
    loginApi({ Email, Password: cryptedPwdByMd5 }),
    async (ud: string) => {
      setUserId(ud);
      await (
        await generateToken
      )();
      router.push('/');
    },
  );
  const login = async () => {
    await (
      await loginReq
    )();
  };
  return (
    <Auth>
      <>
        <h1 className='text-4xl mb-3 '>login</h1>
        <TextField
          id='standard-basic'
          label='email'
          variant='outlined'
          margin='dense'
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id='standard-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='my-1'></div>
        <div className='flex flex-row'>
          <Button variant='outlined' onClick={login}>
            login
          </Button>
          <div className='mr-10'></div>
          <Button
            variant='outlined'
            onClick={() => {
              setAuth({ Email, Password });
              router.push('/register');
            }}
          >
            register
          </Button>
        </div>
      </>
    </Auth>
  );
}

export default Login;
