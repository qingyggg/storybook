import { TextField, Button } from '@mui/material';
import React from 'react';
import Auth from '../../components/Auth';

export default function Modify() {
  return (
    <Auth>
      <>
        <h1 className='text-4xl mb-3 '>Modify</h1>
        <TextField
          id='standard-password-input'
          label='Old-password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
        />
        <TextField
          id='standard-password-input'
          label='New-password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
        />
        <TextField
          id='standard-password-input'
          label='retype new password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
        />
        <div className='my-1'></div>
        <Button variant='outlined'>Modify it</Button>
      </>
    </Auth>
  );
}
