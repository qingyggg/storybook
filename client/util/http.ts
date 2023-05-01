import axios, { AxiosError } from 'axios';
import { log } from 'console';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    //TODO:
    //error.request 404 error
    console.log(222, error);
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
