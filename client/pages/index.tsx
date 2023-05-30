import ArticleList from '../components/ArticleList';
import { useEffect, useState } from 'react';
import { articleListType } from '../api/article/resTypes';
import { useRequest } from '../hooks/useRequest';
import { getArticleListApi } from '../api/article';

//this page used to show article list
export default function Home() {
  const [articleL, setArticleL] = useState<articleListType>([]);
  const [listIsSet, setListIsSet] = useState<boolean>((() => false)());
  const articleReq = useRequest(getArticleListApi(0), (res) => {
    setArticleL(res!);
    setListIsSet(true);
  });
  useEffect(() => {
    articleReq();
  }, []);
  useEffect(() => {
    if (listIsSet) {
      console.log('request like status list');
    }
  }, [listIsSet]);
  return (
    <div className='flex justify-center mt-6 w-full '>
      <ArticleList list={articleL} />
    </div>
  );
}
