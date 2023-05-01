//T is api func
export const alertInfoAttach = <T>(
  api: T,
  sucInfo: string,
  errInfo: string,
): apiType<T> => {
  return [api, sucInfo, errInfo]  
};

export type apiType<T>= [T,string,string]
