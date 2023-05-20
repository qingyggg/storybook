import React, { useState } from 'react';
import Auth from '../../components/Auth';
import { Button, TextField } from '@mui/material';
import { registerApi } from '../../api/user';
import { useRequest } from '../../hooks/useRequest';
import { usePassword } from '../../hooks/usePassword';
import { useRouter } from 'next/router';
import useToken from '../../hooks/useToken';
import useLocalStorage from '../../hooks/useLocalStorage';
import useStatelessStorage from '../../hooks/useStatelessStorage';

export default function Register() {
  const router = useRouter();
  const [Email, setEmail] = useState('');
  const [Password, setPassword, cryptedPwdByMd5] = usePassword();
  const [, setUserId] = useStatelessStorage('userId');
  const { generateToken } = useToken();
  const registerReq = useRequest(
    registerApi({ Email, Password: cryptedPwdByMd5 }),
    async (ud: string) => {
      setUserId(ud);
      await (
        await generateToken
      )();
      router.push('/');
    },
  );
  const register = async () => {
    (await registerReq)();
  };
  return (
    <Auth>
      <>
        <h1 className='text-4xl mb-3 '>register</h1>
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
          <Button variant='outlined' onClick={register}>
            register
          </Button>
          <div className='mr-10'></div>
          <Button variant='outlined' onClick={() => router.push('/login')}>
            login
          </Button>
        </div>
      </>
    </Auth>
  );
}
