import React, { useEffect, useState } from 'react';
import ArticleList from '../../components/ArticleList';
import { articleListType } from '../../api/article/resTypes';
import { useRequest } from '../../hooks/useRequest';
import { getArticleListApi } from '../../api/article';

function MyArticles() {
  const [articleL, setArticleL] = useState<articleListType>([]);
  const articleReq = useRequest(getArticleListApi(0), (res) => {
    setArticleL(res!);
  });
  useEffect(() => {
    articleReq();
  }, []);

  return (
    <div className='flex justify-center mt-6 w-full '>
      <ArticleList list={articleL} />
    </div>
  );
}

export default MyArticles;
