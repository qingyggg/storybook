import { AxiosResponse } from 'axios';
import { baseRes } from '../util/request';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';
import { useRouter } from 'next/router';
import { progressState } from '../store/progress';

export const useNewRequest = () => {
  const [, setAlsState] = useRecoilState(alertState);
  const [, setProgress] = useRecoilState(progressState);
  const router = useRouter();
  const alertSet = (err: any) => {
    setAlsState({
      info: 'error',
      message: err.response.data.message,
      open: true,
    });
  };
  return <T>(api: apiType<T>, forbidSetAlsStateWhenSuccess: boolean = false) =>
    new Promise<T>((res, rej) => {
      setProgress(true);
      api()
        .then(({ data }) => {
          //success callback logical
          if (Array.isArray(data.data)) {
            //<----golang struct
            res(data.data[0]); //data.data=T[]
          } else {
            res(data.data); //<----golang map,string,boolean,null
          }

          if (!forbidSetAlsStateWhenSuccess) {
            setAlsState({ info: 'success', message: data.message, open: true });
          }
        })
        .catch((err) => {
          rej(err); //exe error callback
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
            }
          }
        })
        .finally(() => {
          setProgress(false);
        });
    });
};

type apiType<T> = () => Promise<AxiosResponse<baseRes<T>, any>>;
