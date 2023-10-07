import React, { useMemo, useState } from 'react';
import { articleListType } from '../../api/article/resTypes';
import { useRequest } from '../../hooks/useRequest';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getMyCollectListApi, postCollect } from '@/api/comment';
import ArticleCardForCollect from '@/components/ArticleListForCollect';
import { collectI } from '@/api/comment/reqTypes';
import { idTransform } from '../../util/common';
import { useNewRequest } from '../../hooks/useNewRequest';

function MyCollects() {
  const [articleL, setArticleL] = useState<articleListType>([]);
  const [ud] = useLocalStorage('userId', () => articleReq(), true);
  const [needCollect, setNeedCollect] = useState<boolean>(false);
  const articleReq = useRequest(
    getMyCollectListApi(ud),
    (res) => {
      setArticleL(res!);
    },
    () => {},
    true,
  );
  const molsReq = useNewRequest();

  return (
    <div className='flex flex-col items-center mt-6 w-full'>
      <h1 className='text-blue-600 text-4xl hover:cursor-pointer'>
        my-collects
      </h1>
      <div className='w-8/12 flex flex-col  items-center mt-4 space-y-6'>
        {articleL.map((v) => (
          <ArticleCardForCollect
            {...v}
            key={v.ID}
            onUnColArticle={(id) => {
              molsReq(postCollect({ UserID: idTransform(ud), ArticleID: id }));
            }}
          />
        ))}
      </div>
      <div className='mt-4'></div>
    </div>
  );
}

export default MyCollects;
