import { useEffect, useState } from 'react';
//youd better use useStateLessAuth,because theres too much effects on here!!!
export default function useLocalStorage(
  storageKey: string,
  callback?: () => any,
): [string, (v: string) => void] {
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    setKey(storageKey);
  }, []);
  useEffect(() => {
    return () => {
      const value = localStorage.getItem(key);
      setValue(value ? value : '');
    };
  }, [key]);
  useEffect(() => {
    return () => {
      localStorage.setItem(key, value);
      callback && callback();
    };
  }, [value]);

  return [value, setValue];
}
