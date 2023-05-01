import React, { useState } from 'react';
import Auth from '../../components/Auth';
import { Button, TextField } from '@mui/material';
import { registerApi } from '../../api/user';
import { useRequest } from '../../hooks/useRequest';

export default function Register() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const registerReq = useRequest(...registerApi({ Email, Password }));
  const register = async () => (await registerReq)();
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
        <Button variant='outlined' onClick={register}>
          register
        </Button>
      </>
    </Auth>
  );
}
