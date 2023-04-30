import React from 'react';
import Auth from '../../components/Auth';
import { Button, TextField } from '@mui/material';

function Login() {
  return (
    <Auth>
      <>
        <h1 className='text-4xl mb-3 '>login</h1>
        <TextField
          id='standard-basic'
          label='email'
          variant='outlined'
          margin='dense'
        />
        <TextField
          id='standard-password-input'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
        />
        <div className='my-1'></div>
        <Button variant='outlined'>login</Button>
      </>
    </Auth>
  );
}

export default Login;
