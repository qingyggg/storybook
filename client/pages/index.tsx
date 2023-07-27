import ArticleList from '../components/ArticleList';
import { useEffect, useMemo, useState } from 'react';
import { articleListType } from '../api/article/resTypes';
import { useRequest } from '../hooks/useRequest';
import { getArticleCount, getArticleListApi } from '../api/article';
import { Pagination } from '@mui/material';
import { Stack } from '@mui/system';

//this page used to show article list
export default function Home() {
  const [articleL, setArticleL] = useState<articleListType>([]);
  const [curOffset, setCurOffset] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const articleReq = useRequest(getArticleListApi(curOffset), (res) => {
    setArticleL(res!);
  },()=>{},true);
  const articleCountReq = useRequest(getArticleCount(), (res) => {
    if (res) {
      setPageCount(Math.ceil(res / 15));
    }
  },()=>{},true);
  useEffect(() => {
    articleCountReq();
  }, []);
  useEffect(() => {
    articleReq();
    if (typeof window === 'object') window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [curOffset]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurOffset((value - 1) * 15);
  };

  return (
    <div className='flex  flex-col items-center mt-6 w-full'>
      <ArticleList list={articleL} />
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
