export default function useStatelessStorage(
  storageKey: string,
): [() => string, (v: string) => void] {
  let key = storageKey;
  let value = '';
  //please in useEffect func when you use this function
  function setValue(v: string) {
    value = v;
    localStorage.setItem(key, v);
  }
  function getValue() {
    value = localStorage.getItem(key) || '';
    return value;
  }
  return [getValue, setValue];
}
