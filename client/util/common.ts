export const idTransform = (id: string | string[] | undefined) => {
  if (typeof id === 'string') {
    return parseInt(id);
  } else {
    return 0;
  }
};
