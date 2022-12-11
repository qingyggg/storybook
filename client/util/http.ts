import axios from "axios";

const instance = axios.create({
  baseURL: "localhost:8080",
  timeout:1000
})

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export {instance}