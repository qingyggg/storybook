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
      s(data.data); //set data on callback function
      if (!forbidSetAlsStateWhenSuccess) {
        setAlsState({ info: 'success', message: data.message, open: true });
      }
    } catch (err: any) {
      e(err); //exe error callback
      console.log(err);
      if (err.response.status === 404) {
        //404
        setAlsState({ info: 'error', message: 'network 404', open: true });
      } else {
        alertSet(err);
        if (err.response.status === 401) {
          router.push('/login');
        }
      }
    }
  };
};

type apiType = (p?: any) => Promise<AxiosResponse<baseRes<unknown>, any>>;
type sucCb = (data: any) => any;
type errCb = (err: any) => any;
