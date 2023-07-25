import { useEffect, useState } from 'react';

export default function useLocalStorage(
  storageKey: string,
  callback?: () => any,
  defaultValNeedCb?: boolean,
): [string, (v: string) => void] {
  const [value, setValue] = useState<string>('empty value');
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isDefaultVal, setIsDefaultVal] = useState<boolean>(false);
  //useEffect in one hook can be combined when executing
  useEffect(() => {
    const stoV = localStorage.getItem(storageKey);
    if (!stoV) {
      return;
    }
    setValue(stoV);
    setIsFirst(false);
    setIsDefaultVal(true);
  }, []);
  useEffect(() => {
    if (!isFirst) {
      localStorage.setItem(storageKey, value);
      //only call when user call setPlusValue
      if (!isDefaultVal) {
        callback && callback();
      } else {
        if (defaultValNeedCb) {
          callback && callback();
        }
      }
    }
  }, [value, isFirst, isDefaultVal]);
  const setPlusValue = (v: string) => {
    isFirst && setIsFirst(false);
    isDefaultVal && setIsDefaultVal(false);
    return setValue(v);
  };
  return [value, setPlusValue];
}
