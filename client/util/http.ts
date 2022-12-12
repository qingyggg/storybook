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
  //TODO:1.if err.code=404,alert("network has an error")
  //2.if err.code=400,get message Info,and alert() it
  //field:1.error.response.status 2.error.response.status-->for get error message
  return Promise.reject(error);
});

export {instance}