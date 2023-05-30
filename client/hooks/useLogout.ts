//used for logout or token expired
import { useEffect } from 'react';

export default () => {
  return () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  };
};
