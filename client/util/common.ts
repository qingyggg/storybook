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
