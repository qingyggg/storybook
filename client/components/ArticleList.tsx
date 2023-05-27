import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { useRequest } from '../hooks/useRequest';
import { getArticleListApi } from '../api/article';
import { articleListType } from '../api/article/resTypes';

export default function ArticleList() {
  const [articleL, setArticleL] = useState<articleListType>([]);
  const articleReq = useRequest(getArticleListApi(0), (res) => {
    setArticleL(res);
  });
  useEffect(() => {
    articleReq();
  }, []);
  return (
    <div className='w-8/12 space-y-6'>
      {articleL.map((v) => (
        <ArticleCard {...v} key={v.ID} />
      ))}
    </div>
  );
}
