import { useDebounceFn } from 'ahooks';
import { FloatButton, Skeleton } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import AuthorForArticleDetail from '../../components/AuthorForArticleDetail';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { idTransform } from '../../util/common';
import { useRouter } from 'next/router';
import { useRequest } from '../../hooks/useRequest';
import { getArticleDetailApi } from '@/api/article';
import {
  getCommentListApi,
  postCollect,
  postCollectStatus,
  postCommentApi,
  postLike,
  postLikeStatus,
} from '../../api/comment';
import { commentListT } from '../../api/comment/resTypes';
import CommentList from '../../components/CommentList';
import { showProfileI } from '../../api/user/resTypes';
import { showProfileApi } from '../../api/user';
import { articleDetailI } from '../../api/article/resTypes';
import moment from 'moment';
import useLocalStorage from '../../hooks/useLocalStorage';
import { collectI, likeI } from '../../api/comment/reqTypes';
import { useNewRequest } from '../../hooks/useNewRequest';

export default function Detail() {
  //state hook
  const router = useRouter();
  const [detail, setDetail] = useState<articleDetailI>();
  const [cmList, setCmList] = useState<commentListT>([]);
  const { ad } = router.query;
  const [readerId] = useLocalStorage('userId');
  //like payload===collect payload
  const likePayload: likeI = useMemo(() => {
    return { ArticleID: idTransform(ad), UserID: idTransform(readerId) };
  }, [ad, readerId]);
  const [readerIsLike, setReaderIsLike] = useState<boolean>(false);
  const [readerIsCollect, setReaderIsCollect] = useState<boolean>(false);
  const [authorInfo, setAuthorInfo] = useState<showProfileI>();

  //new request hook
  const molsReq = useNewRequest();
  //pre request
  const getAuthorProfile = (authorId: number) =>
    molsReq(showProfileApi(authorId), true).then((res) => setAuthorInfo(res));
  const commentCurArticle = (data: string) =>
    molsReq(postCommentApi({ ...likePayload, Content: data }));
  //full request functions
  const getArticleDetail = () =>
    molsReq(getArticleDetailApi(idTransform(ad)), true).then((res) => {
      setDetail(res);
      getAuthorProfile(res.UserID);
    });
  const getCommentLists = () =>
    molsReq(getCommentListApi(idTransform(ad)), true).then((res) =>
      setCmList(res),
    );
  const likeCurArticle = () =>
    molsReq(postLike(likePayload)).then((res) => setReaderIsLike(res.isLike));
  const getCollectStatus = () =>
    molsReq(postCollectStatus(likePayload), true).then((res) =>
      setReaderIsCollect(res.isCollect),
    );
  const getLikeStatus = () =>
    molsReq(postLikeStatus(likePayload), true).then((res) =>
      setReaderIsLike(res.isLike),
    );
  const collectCurArticle = () =>
    molsReq(postCollect(likePayload)).then((res) =>
      setReaderIsCollect(res.isCollect),
    );
  const likeDebounced = useDebounceFn(likeCurArticle, { wait: 500 });
  const likeHandler = () => {
    setReaderIsLike(!readerIsLike);
    likeDebounced.run();
  };
  const collectDebounced = useDebounceFn(collectCurArticle, {
    wait: 500,
  });
  const collectHandler = () => {
    setReaderIsCollect(!readerIsCollect);
    collectDebounced.run();
  };

  //effect
  useEffect(() => {
    if (idTransform(ad) === -1 || idTransform(readerId) === -1) {
      return;
    }
    getArticleDetail();
    getCommentLists();
    getCollectStatus();
    getLikeStatus();
  }, [ad, readerId]);
  const jsxReturn = () => {
    if (detail && authorInfo) {
      return (
        <div className='w-full flex-row flex'>
          <div className='w-4/5 flex-col flex items-center'>
            <div className='w-1/2'>
              <h1 className='text-6xl my-6 '>{detail.Title}</h1>
              <div className='text-gray-400 flex pb-6 border-b-2'>
                <p>
                  created:
                  {moment(detail.CreatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                <div className='mx-10'></div>
                <p>
                  latest update:
                  {moment(detail.CreatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
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
              AuthorID={detail.UserID}
              ReaderID={likePayload.UserID}
              onCmtAdd={(data) => commentCurArticle(data)}
              authorInfo={authorInfo}
              likeStatus={readerIsLike}
              onClickForLike={likeHandler}
              collectStatus={readerIsCollect}
              onClickForCollect={collectHandler}
            />
          </div>
          <FloatButton.BackTop
            type='primary'
            style={{ transform: 'scale(1.5)', right: 65, bottom: 70 }}
          />
        </div>
      );
    } else {
      return Array.apply(null, Array(10)).map((v, k) => (
        <Skeleton key={k} paragraph={{ rows: 4 }} active />
      ));
    }
  };
  return jsxReturn();
}
