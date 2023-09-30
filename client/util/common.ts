import { baseRes } from './request';

export const idTransform = (id: string | string[] | undefined | number) => {
  if (typeof id === 'number') {
    return id;
  }
  if (typeof id === 'string') {
    let transformedId = parseInt(id);
    if (isNaN(transformedId)) {
      return -1;
    } else {
      return transformedId;
    }
  } else {
    return -1;
  }
};

//data consumer ==>for getServerSideProps
export const dataConsumer = <T>(data: baseRes<T>) => {
  if (Array.isArray(data.data)) {
    //<----golang struct
    return data.data[0]; //data.data=T[]
  } else {
    return data.data; //<----golang map,string,boolean
  }
};
