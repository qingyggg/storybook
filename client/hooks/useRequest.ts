import { AxiosResponse } from 'axios';
import { baseRes } from '../util/request';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';
import { useRouter } from 'next/router';
import useLogout from './useLogout';
import { progressState } from '../store/progress';

export const useRequest = <T>(
  api: apiType<T>,
  s?: sucCb<T>,
  e?: errCb,
  forbidSetAlsStateWhenSuccess: boolean = false,
) => {
  const [, setAlsState] = useRecoilState(alertState);
  const [, setProgress] = useRecoilState(progressState);
  const router = useRouter();
  const logout = useLogout();
  const alertSet = (err: any) => {
    setAlsState({
      info: 'error',
      message: err.response.data.message,
      open: true,
    });
  };
  return () => {
    setProgress(true);
    api()
      .then((res) => {
        const resVal = res.data;
        //success callback logical
        if (s) {
          if (resVal.data) {
            if (Array.isArray(resVal.data)) {
              //<----golang struct
              s(resVal.data[0]); //data.data=T[]
            } else {
              s(resVal.data); //<----golang map,string,boolean
            }
          } else {
            s(null);
          }
        }

        if (!forbidSetAlsStateWhenSuccess) {
          setAlsState({ info: 'success', message: resVal.message, open: true });
        }
      })
      .catch((err) => {
        e && e(err); //exe error callback
        console.log(err);
        if (err.code === 'ERR_NETWORK') {
          //404
          setAlsState({ info: 'error', message: 'network 404', open: true });
        } else {
          if (err.response.status === 401) {
            router.push('/login');
            setAlsState({
              info: 'warning',
              message: 'please login or register your account at first',
              open: true,
            });
            logout();
          } else {
            alertSet(err);
          }
        }
      })
      .finally(() => {
        setProgress(false);
      });
  };
};

type apiType<T> = () => Promise<AxiosResponse<baseRes<T>, any>>;
type sucCb<T> = (data: T | null) => any;
type errCb = (err: any) => any;
