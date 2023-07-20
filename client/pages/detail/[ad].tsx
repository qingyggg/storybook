import React, { useEffect, useMemo, useState } from 'react';
import AuthorForArticleDetail from '../../components/AuthorForArticleDetail';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { idTransform } from '../../util/common';
import { useRouter } from 'next/router';
import { useRequest } from '../../hooks/useRequest';
import { getArticleDetailApi } from '../../api/article';
import { getCommentListApi } from '../../api/comment';
import { commentListT } from '../../api/comment/resTypes';
import CommentList from '../../components/CommentList';
import useLocalStorage from '../../hooks/useLocalStorage';

export default function Detail() {
  const [markdown, setMarkdown] = useState<string>('');
  const [cmList, setCmList] = useState<commentListT>([]);
  const [commentIsAdd, setCommentIsAdd] = useState<boolean>(false);
  const router = useRouter();
  const { ad } = router.query;
  const [ud] = useLocalStorage('userId');
  const getArticleDetail = useRequest(
    getArticleDetailApi(idTransform(ad)),
    (res) => {
      setMarkdown(res!.Content);
    },
  );
  const getCommentLists = useRequest(
    getCommentListApi(idTransform(ad)),
    (res) => {
      setCmList(res!);
      setCommentIsAdd(false);
    },
  );
  useMemo(() => {
    if (commentIsAdd) {
      getCommentLists();
      setCommentIsAdd(false);
    }
  }, [commentIsAdd]);
  useEffect(() => {
    if (idTransform(ad) === 0) {
      return;
    }
    getArticleDetail();
    getCommentLists();
  }, [ad]);
  return (
    <div className='w-full flex-row flex'>
      <div className='w-4/5 flex-col flex items-center'>
        <h1 className='text-4xl'>i am the tileuhuu</h1>
        <div>
          <article className='prose lg:prose-xl'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </article>
        </div>
        <CommentList list={cmList} />
      </div>
      <div className='fixed top-28 right-8'>
        <AuthorForArticleDetail
          ArticleID={idTransform(ad)}
          UserID={idTransform(ud)}
          setCommentIsAdd={setCommentIsAdd}
        />
      </div>
    </div>
  );
}
