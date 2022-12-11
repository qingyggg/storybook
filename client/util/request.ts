import { instance } from "./http"
export const get = (uri:string,sucCb:any,errCb:any) => {
  instance.get(uri).then(res=>sucCb(res)).catch((err)=>errCb(err))
}

export const post = (uri:string,body:any,sucCb:any,errCb:any) => {
  instance.post(uri,body).then(res=>sucCb(res)).catch((err)=>errCb(err))
}