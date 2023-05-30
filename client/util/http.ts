import axios, { AxiosError } from 'axios';
import { log } from 'console';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem('token');
    if (token) {
      //''===false
      // @ts-ignore
      config.headers['Authorization'] = 'Bearer' + ' ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  },
);

export { instance };
