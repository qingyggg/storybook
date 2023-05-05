import { AxiosResponse } from 'axios';
import { baseRes } from '../util/request';
import { useRecoilState } from 'recoil';
import { alertState } from '../store/alert';

export const useRequest = async <T=any>(api: apiType, s:sucCb=(res:baseRes<T>)=>void 0,e:errCb=()=>void 0,forbidSetAlsStateWhenSuccess:boolean=false) => {
  const [, setAlsState] = useRecoilState(alertState);
  return async () => {
    try {
      let { data } = await api();
      s(data.data)//set data on callback function
      if (!forbidSetAlsStateWhenSuccess) {
        setAlsState({ info: 'success', message: data.message, open: true });
      }
    } catch (err: any) {
      e(err)
      if (err.code === 'ERR_BAD_REQUEST') {
        setAlsState({
          info: 'error',
          message: err.response.data.message,
          open: true,
        });
      } else {
        //404,internal server error....
        setAlsState({ info: 'error', message: 'network 404', open: true });
      }
    }
  };
};

type apiType = () => Promise<AxiosResponse<baseRes<unknown>, any>>;
type sucCb = (data: any) => any
type errCb=(err:any)=>any
