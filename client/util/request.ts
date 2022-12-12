import { AxiosResponse } from "axios"
import { instance } from "./http"
export const get =async (uri:string):Promise<AxiosResponse<any, any>> => {
  return instance.get(uri)
}

export const post = (uri:string,body:any):Promise<AxiosResponse<any, any>> => {
  return instance.post(uri,body)
}

