import { Alert, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';

export const MolsAlert: React.FC = () => {
  const [alS, setAls] = useRecoilState(alertState);
  const handleClose = () => {
    setAls({ info: 'info', message: '', open: false });
  };
  return (
    <Snackbar open={alS.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alS.info} sx={{ width: '100%' }}>
        {alS.message}
      </Alert>
    </Snackbar>
  );
};
