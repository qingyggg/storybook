import { AxiosResponse } from 'axios';
import { baseRes } from './request';

export const serRequest = <T>(api: apiType<T>) => {
  return new Promise<T | 'notfound'>((resolve, reject) => {
    api()
      .then((res) => {
        resolve(dataConsumer(res.data)!);
      })
      .catch((err: 'notfound') => {
        reject(err);
        /*if (err.code === 'ERR_NETWORK') {
          reject('notfound');
        } else if (err.response.status === 401) {
          //unauthorization error
          //return 401 code to pages/_error.js ,and use custom pages/_error.js get error code,then redirect to login page
          //https://nextjs.org/docs/pages/building-your-application/routing/custom-error#more-advanced-error-page-customizing
        }else{
          // server internal error,return to error page
        }
      });*/
      });
  });
};

type apiType<T> = () => Promise<AxiosResponse<baseRes<T>, any>>;

//data consumer ==>for getServerSideProps
export const dataConsumer = <T>(data: baseRes<T>) => {
  if (Array.isArray(data.data)) {
    //<----golang struct
    return data.data[0]; //data.data=T[]
  } else {
    return data.data; //<----golang map,string,boolean
  }
};
