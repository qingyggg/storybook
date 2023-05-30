import { useEffect, useState } from 'react';

export default function useLocalStorage(
  storageKey: string,
  callback?: () => any,
): [string, (v: string) => void] {
  const [value, setValue] = useState<string>('empty value');
  const [isFirst, setIsFirst] = useState<boolean>(true);
  //useEffect in one hook can be combined when executing
  useEffect(() => {
    const stoV = localStorage.getItem(storageKey);
    if (!stoV) {
      return;
    }
    setValue(stoV);
    setIsFirst(false);
  }, []);
  useEffect(() => {
    return () => {
      if (!isFirst) {
        localStorage.setItem(storageKey, value);
        callback && callback();
      }
    };
  }, [value, isFirst]);
  const setPlusValue = (v: string) => {
    isFirst && setIsFirst(false);
    return setValue(v);
  };
  return [value, setPlusValue];
}
