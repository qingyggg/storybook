import { AxiosResponse } from "axios"
import { baseRes } from "../util/request"
import { useRecoilState } from "recoil"
import { alertState } from "../store/alert"

export const useRequest =async (api: apiType, sI: string, eI: string, setData?: setDataType) => {
  const [, setAlsState] = useRecoilState(alertState)
  return async() => {
    try {
      let { data } = await api()
      if (setData) {
        setData(data)
      }
      setAlsState({info:'error',message:sI,open:true})
    }catch(err:any){
      if (err.code === 'ERR_NETWORK') {
        setAlsState({info:'error',message:"network 404",open:true})
      } else {
        //server internal error
        setAlsState({info:'error',message:eI,open:true})
      }
    }
  }
}

type apiType = () => Promise<AxiosResponse<baseRes<unknown>, any>>
type setDataType=React.Dispatch<React.SetStateAction<unknown>>