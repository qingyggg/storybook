import React, { useEffect, useMemo, useState } from 'react';
import AuthorForArticleDetail from '../../components/AuthorForArticleDetail';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { idTransform } from '../../util/common';
import { useRouter } from 'next/router';
import { useRequest } from '../../hooks/useRequest';
import { getArticleDetailApi } from '../../api/article';
import { getCommentListApi, postLike, postLikeStatus } from '../../api/comment';
import { commentListT } from '../../api/comment/resTypes';
import CommentList from '../../components/CommentList';
import { showProfileI } from '../../api/user/resTypes';
import { showProfileApi } from '../../api/user';
import { articleDetailI } from '../../api/article/resTypes';
import moment from 'moment';
import useLocalStorage from '../../hooks/useLocalStorage';
import { likeI } from '../../api/comment/reqTypes';
import { useDebounceFn } from 'ahooks';

export default function Detail() {
  //state hook
  const router = useRouter();
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
  const [authorId, setAuthorId] = useState<number>(-1);
  const { ad } = router.query;
  const [readerId] = useLocalStorage('userId');
  const likePayload: likeI = useMemo(() => {
    return { ArticleID: idTransform(ad), UserID: idTransform(readerId) };
  }, [ad, readerId]);
  const [readerIsLike, setReaderIsLike] = useState<boolean>(false);
  const [authorInfo, setAuthorInfo] = useState<showProfileI>({
    Age: 0,
    Avatar: [],
    Description: 'im Marisa,you discover me tho,where is the real author?',
    Github: '',
    ID: -1,
    Name: 'Marisa',
    Twitter: '',
  });

  //root comment->second comment->replyed second comment

  //request hook
  const likeStatusReq = useRequest(postLikeStatus(likePayload), (v) => {
    setReaderIsLike(v?.isLike!);
  },()=>{},true);
  const likeReq = useRequest(postLike(likePayload), (v) => {
    //set final like status(correct)
    setReaderIsLike(v?.isLike!);
  });

  const authorShowReq = useRequest(showProfileApi(authorId), (data) =>
    setAuthorInfo(data!),()=>{},true
  );
  const getArticleDetail = useRequest(
    getArticleDetailApi(idTransform(ad)),
    (res) => {
      setDetail(res!);
      setAuthorId(res?.UserID!);
    },()=>{},true
  );
  const getCommentLists = useRequest(
    getCommentListApi(idTransform(ad)),
    (res) => {
      setCmList(res!);
      setCommentIsAdd(false);
    },()=>{},true
  );

  //custom function
  const likeReqDebounced = useDebounceFn(likeReq, { wait: 500 });
  const likeHandler = () => {
    setReaderIsLike(!readerIsLike);
    likeReqDebounced.run();
  };

  //memo hook
  useMemo(() => {
    if (commentIsAdd) {
      getCommentLists();
      setCommentIsAdd(false);
    }
  }, [commentIsAdd]);
  useMemo(() => {
    if (authorId !== -1) {
      authorShowReq();
    }
  }, [authorId]);

  //effect
  useEffect(() => {
    if (idTransform(ad) === -1) {
      return;
    }
    getArticleDetail();
    getCommentLists();
  }, [ad]);
  useEffect(() => {
    if (likePayload.UserID != -1 && likePayload.ArticleID != -1) {
      likeStatusReq();
    }
  }, [likePayload]);
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
          AuthorID={authorId}
          ReaderID={likePayload.UserID}
          setCommentIsAdd={setCommentIsAdd}
          authorInfo={authorInfo}
          likeStatus={readerIsLike}
          onClickForLike={likeHandler}
        />
      </div>
    </div>
  );
}
