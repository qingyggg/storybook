import { TextField, Button, FormControl, useFormControl } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Auth from '../../components/Auth';
import { useRouter } from 'next/router';
import { modifyApi } from '../../api/user';
import { usePassword } from '../../hooks/usePassword';
import { useRequest } from '../../hooks/useRequest';
import { useRecoilState } from 'recoil';
import { idTransform } from '../../util/common';
import { alertState } from '../../store/alert';

export default function Modify() {
  const { focused } = useFormControl() || {};
  const router = useRouter();
  const { id } = router.query;
  const [, setAlsState] = useRecoilState(alertState);
  const [OldPassword, setOldPassword, cryptOldPwdByMd5] = usePassword();
  const [Password1, setPassword1, cryptPwdByMd51] = usePassword();
  const [Password2, setPassword2, cryptPwdByMd52] = usePassword();
  const [isInputErrStyle, setIsInputErrStyle] = useState<boolean>(false);
  const modifyReq = useRequest(
    modifyApi({
      ID: idTransform(id),
      OldPassword: cryptOldPwdByMd5,
      Password: cryptPwdByMd52,
    }),
    () => router.push('/'),
    () => {
      setIsInputErrStyle(true);
      setOldPassword('');
      setPassword1('');
      setPassword2('');
    },
  );
  const modify = async () => {
    if (Password1 !== Password2) {
      setAlsState({
        info: 'error',
        message: 'The two entered passwords do not match',
        open: true,
      });
      setIsInputErrStyle(true);
    } else {
      (await modifyReq)();
    }
  };
  useEffect(() => {
    setIsInputErrStyle(false);
  }, [focused]);
  return (
    <Auth>
      <FormControl sx={{ width: '25ch' }}>
        <h1 className='text-4xl mb-3 '>Modify</h1>
        <TextField
          error={isInputErrStyle}
          label='old-password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
          value={OldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          error={isInputErrStyle}
          label='new-password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
          value={Password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <TextField
          error={isInputErrStyle}
          label='retype new password'
          type='password'
          autoComplete='current-password'
          variant='outlined'
          margin='dense'
          value={Password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <div className='my-1'></div>
        <Button variant='outlined' onClick={modify}>
          Modify Password
        </Button>
      </FormControl>
    </Auth>
  );
}
