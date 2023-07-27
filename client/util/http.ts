import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:8080',
  timeout: 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
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
