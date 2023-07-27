export const idTransform = (id: string | string[] | undefined) => {
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
