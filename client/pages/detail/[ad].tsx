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
import { showProfileI } from '../../api/user/resTypes';
import { showProfileApi } from '../../api/user';
import { articleDetailI } from '../../api/article/resTypes';
import moment from 'moment';

export default function Detail() {
  const [detail, setDetail] = useState<articleDetailI>({
    CommentNumber: 0,
    Comments: [],
    Content: '',
    Description: '',
    ID: 0,
    LikeNumber: 0,
    Title: '',
    UserID: 0,
    CreatedAt: '',
    UpdatedAt: '',
  });
  const [cmList, setCmList] = useState<commentListT>([]);
  const [commentIsAdd, setCommentIsAdd] = useState<boolean>(false);
  const router = useRouter();
  const { ad } = router.query;
  const [authorId, setAuthorId] = useState<number>(0);
  const [authorInfo, setAuthorInfo] = useState<showProfileI>({
    Age: 0,
    Avatar: [],
    Description: 'im Marisa,you discover me tho,where is the real author?',
    Github: '',
    ID: 0,
    Name: 'Marisa',
    Twitter: '',
  });
  const authorShowReq = useRequest(showProfileApi(authorId), (data) =>
    setAuthorInfo(data!),
  );
  const getArticleDetail = useRequest(
    getArticleDetailApi(idTransform(ad)),
    (res) => {
      setDetail(res!);
      setAuthorId(res?.UserID!);
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
  useMemo(() => {
    if (authorId !== 0) {
      authorShowReq();
    }
  }, [authorId]);
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
        <div className='w-1/2'>
          <h1 className='text-6xl my-6 '>{detail.Title}</h1>
          <div className='text-gray-400 flex pb-6 border-b-2'>
            <p>
              created
              {moment(detail.CreatedAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            <div className='mx-10'></div>
            <p>latest update:{detail.UpdatedAt}</p>
          </div>
        </div>
        <div>
          <article className='prose lg:prose-xl'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {detail.Content}
            </ReactMarkdown>
          </article>
        </div>
        <CommentList list={cmList} />
      </div>
      <div className='fixed top-28 right-8'>
        <AuthorForArticleDetail
          ArticleID={idTransform(ad)}
          UserID={authorId}
          setCommentIsAdd={setCommentIsAdd}
          authorInfo={authorInfo}
        />
      </div>
    </div>
  );
}
