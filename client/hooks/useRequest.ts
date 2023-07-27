import { AxiosResponse } from 'axios';
import { baseRes } from '../util/request';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';
import { useRouter } from 'next/router';
import useLogout from './useLogout';

export const useRequest = <T>(
  api: apiType<T>,
  s?: sucCb<T>,
  e?: errCb,
  forbidSetAlsStateWhenSuccess: boolean = false,
) => {
  const [, setAlsState] = useRecoilState(alertState);
  const router = useRouter();
  const logout = useLogout();
  const alertSet = (err: any) => {
    setAlsState({
      info: 'error',
      message: err.response.data.message,
      open: true,
    });
  };
  return async () => {
    try {
      let { data } = await api();
      //success callback logical
      if (s) {
        if (data.data) {
          if (Array.isArray(data.data)) {
            //<----golang struct
            s(data.data[0]); //data.data=T[]
          } else {
            s(data.data); //<----golang map,string,boolean
          }
        } else {
          s(null);
        }
      }

      if (!forbidSetAlsStateWhenSuccess) {
        setAlsState({ info: 'success', message: data.message, open: true });
      }
    } catch (err: any) {
      e && e(err); //exe error callback
      console.log(err);
      if (err.code === 'ERR_NETWORK') {
        //404
        setAlsState({ info: 'error', message: 'network 404', open: true });
      } else {
        alertSet(err);
        if (err.response.status === 401) {
          router.push('/login');
          setAlsState({
            info: 'warning',
            message: 'please login or register your account at first',
            open: true,
          });
          logout();
        }
      }
    }
  };
};

type apiType<T> = () => Promise<AxiosResponse<baseRes<T>, any>>;
type sucCb<T> = (data: T | null) => any;
type errCb = (err: any) => any;
