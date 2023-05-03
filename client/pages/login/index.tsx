import React, { useState } from 'react';
import Auth from '../../components/Auth';
import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { loginApi } from '../../api/user';
import { usePassword } from '../../hooks/usePassword';
import { useRequest } from '../../hooks/useRequest';

function Login() {
  const router = useRouter();
  const [Email, setEmail] = useState('');
  const [Password, setPassword, cryptPwdByMd5] = usePassword();
  const loginReq = useRequest(loginApi({ Email, Password })[0], () =>
    router.push('/'),
  );
  const login = async () => {
    cryptPwdByMd5(); //crypto password
    (await loginReq)();
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
        <Button variant='outlined' onClick={login}>
          login
        </Button>
      </>
    </Auth>
  );
}

export default Login;
