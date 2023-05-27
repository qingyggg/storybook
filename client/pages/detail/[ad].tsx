import React, { useEffect, useState } from 'react';
import CommentCard from '../../components/CommentCard';
import AuthorForArticleDetail from '../../components/AuthorForArticleDetail';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { idTransform } from '../../util/common';
import { useRouter } from 'next/router';
import useStatelessStorage from '../../hooks/useStatelessStorage';
import { useRequest } from '../../hooks/useRequest';
import { articleDetailI } from '../../api/article/resTypes';
import { getArticleDetailApi } from '../../api/article';

export default function Detail() {
  const [markdown, setMarkdown] = useState<string>('');
  const router = useRouter();
  const { ad } = router.query;
  const getArticleDetail = useRequest(
    getArticleDetailApi(idTransform(ad)),
    (res) => {
      setMarkdown(res.Content);
    },
  );
  useEffect(() => {
    if (idTransform(ad) === 0) {
      return;
    }
    getArticleDetail();
  }, [ad]);
  return (
    <div className='w-full flex-row flex'>
      <div className='w-4/5 flex-col flex items-center bg-cyan-200'>
        <h1 className='text-4xl'>i am the tileuhuu</h1>
        <div>
          <article className='prose lg:prose-xl'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </article>
        </div>
        <div className='w-full flex flex-col space-y-4 items-center mt-6'>
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
      <div className='fixed top-28 right-8'>
        <AuthorForArticleDetail />
      </div>
    </div>
  );
}
