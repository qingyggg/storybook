import React, { useState } from 'react';
import { articleListType } from '../../api/article/resTypes';
import { useRequest } from '../../hooks/useRequest';
import { getMyArticleApi } from '../../api/article';
import ArticleCardForEdit from '../../components/ArticleCardForEdit';
import useLocalStorage from '../../hooks/useLocalStorage';

function MyArticles() {
  const [articleL, setArticleL] = useState<articleListType>([]);
  const [ud] = useLocalStorage('userId', () => articleReq(), true);
  const articleReq = useRequest(
    getMyArticleApi(ud),
    (res) => {
      setArticleL(res!);
    },
    () => {},
    true,
  );
  return (
    <div className='flex flex-col items-center mt-6 w-full'>
      <h1 className='text-blue-600 text-4xl hover:cursor-pointer'>
        my-articles
      </h1>
      <div className='w-8/12 flex flex-col  items-center mt-4 space-y-6'>
        {articleL.map((v) => (
          <ArticleCardForEdit key={v.ID} {...v} />
        ))}
      </div>
      <div className='mt-4'></div>
    </div>
  );
}

export default MyArticles;
