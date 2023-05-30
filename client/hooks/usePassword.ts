import md5 from 'md5';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

export const usePassword = (): returnType => {
  const [state, setState] = useState<string>('');
  const [cryptedPwdByMd5, setCryptedPwdByMd5] = useState<string>('');
  useMemo(() => {
    setCryptedPwdByMd5(md5(state));
  }, [state]);
  return [state, setState, cryptedPwdByMd5];
};

type returnType = [string, Dispatch<SetStateAction<string>>, string];
