import { AxiosResponse } from 'axios';
import { baseRes } from '../util/request';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';
import { useRouter } from 'next/router';

export const useRequest = <T = any>(
  api: apiType,
  s: sucCb = (res: baseRes<T>) => void 0,
  e: errCb = () => void 0,
  forbidSetAlsStateWhenSuccess: boolean = false,
) => {
  const [, setAlsState] = useRecoilState(alertState);
  const router = useRouter();
  return async () => {
    try {
      let { data } = await api();
      s(data.data); //set data on callback function
      if (!forbidSetAlsStateWhenSuccess) {
        setAlsState({ info: 'success', message: data.message, open: true });
      }
    } catch (err: any) {
      e(err);
      if (err.code === 'ERR_BAD_REQUEST') {
        setAlsState({
          info: 'error',
          message: err.response.data.message,
          open: true,
        });
        //unauthorized case
      } else if (err.response.status === 401) {
        setAlsState({
          info: 'error',
          message: err.response.data.message,
          open: true,
        });
        router.push('/login');
      } else {
        //404,internal server error....
        setAlsState({ info: 'error', message: 'network 404', open: true });
      }
    }
  };
};

type apiType = (p?: any) => Promise<AxiosResponse<baseRes<unknown>, any>>;
type sucCb = (data: any) => any;
type errCb = (err: any) => any;
