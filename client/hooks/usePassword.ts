import md5 from "md5"
import { Dispatch, SetStateAction, useState } from "react"

export const usePassword=():returnType=>{ 
  const [state, setState] = useState<string>("")
  const cryptPwdByMd5 = () => {
    setState(md5(state))
  }
  return [state,setState,cryptPwdByMd5]
}

type returnType=[string,Dispatch<SetStateAction<string>>,()=>void]