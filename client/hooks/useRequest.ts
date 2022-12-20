import { apiI } from '../util/alert';

const useRequest = <F>(apiGetter: apiI<F>, alertLevel: 'error' | 'info') => {
  //store info into logger array,and get it by axios interceptor
  const { api,sucInfo,errInfo } = apiGetter//api is request function
  return api
}

export default useRequest

