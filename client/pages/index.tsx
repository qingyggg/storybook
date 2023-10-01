import ArticleList from '../components/ArticleList';
import { useEffect, useMemo, useState } from 'react';
import { articleListType } from '@/api/article/resTypes';
import { useRequest } from '../hooks/useRequest';
import { getArticleCount, getArticleListApi } from '@/api/article';
import { Pagination, Stack } from '@mui/material';
import { Skeleton } from 'antd';

//this page used to show article list
export default function Home() {
  const [articleL, setArticleL] = useState<articleListType>([]);
  const [curOffset, setCurOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [listIsLoading, setListIsLoading] = useState(false);
  const articleReq = useRequest(
    getArticleListApi(curOffset),
    (res) => {
      setListIsLoading(false);
      setArticleL(res!);
    },
    () => {},
    true,
  );
  const articleCountReq = useRequest(
    getArticleCount(),
    (res) => {
      if (res) {
        setPageCount(Math.ceil(res / 15));
      }
    },
    () => {},
    true,
  );
  useEffect(() => {
    articleCountReq();
  }, []);
  useEffect(() => {
    setListIsLoading(true);
    articleReq();
    if (typeof window === 'object')
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [curOffset]);
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurOffset((value - 1) * 15);
  };

  return (
    <div className='flex  flex-col items-center mt-6 w-full'>
      <ArticleList list={articleL} isLoading={listIsLoading} />
      {pageCount !== 0 && (
        <Stack spacing={2}>
          <Pagination
            count={pageCount}
            variant='outlined'
            page={curOffset}
            shape='rounded'
            onChange={handlePageChange}
          />
        </Stack>
      )}
    </div>
  );
}
