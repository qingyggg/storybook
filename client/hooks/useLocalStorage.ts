import { useEffect, useState } from 'react';
export default function useLocalStorage(
  storageKey: string,
): [string, (v: string) => void] {
  return useStorageHandler(storageKey);
}

function useStorageHandler(storageKey: string): [string, (v: string) => void] {
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
    return () => localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}
