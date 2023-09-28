//used for logout or token expired
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return () => {
    localStorage.removeItem('userId');
    router.push('/login');
  };
};
