import ArticleCard from '../components/ArticleCard';
import ArticleList from '../components/ArticleList';
import useClientAuth from '../hooks/useClientAuth';
import { useEffect } from 'react';

//this page used to show article list
export default function Home() {
  const { routerAttach } = useClientAuth();
  // useEffect(() => {
  //   routerAttach(['/profile', '/modify', '/profileEdit']);
  // }, []);
  return (
    <div className='flex justify-center mt-6 w-full '>
      <ArticleList />
    </div>
  );
}
