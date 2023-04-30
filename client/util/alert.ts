//T is api func
export const alertInfoAttach = <T>(
  api: T,
  sucInfo: string,
  errInfo: string,
): apiI<T> => {
  return { api, sucInfo, errInfo };
};

export interface apiI<T> {
  api: T;
  sucInfo: string;
  errInfo: string;
}
