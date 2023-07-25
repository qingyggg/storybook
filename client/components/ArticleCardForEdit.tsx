import ArticleCard from './ArticleCard';
import { Button } from '@mui/material';
import Link from 'next/link';
import { articleItemForListI } from '../api/article/resTypes';
import { useRequest } from '../hooks/useRequest';
import { postArticleDeleteApi } from '../api/article';
import { idTransform } from '../util/common';
import { useState } from 'react';

export default function ArticleCardForEdit(props: articleItemForListI) {
  const [isDied, setIsDied] = useState<boolean>(false);
  const delArticleReq = useRequest(
    postArticleDeleteApi({ ArticleID: idTransform(props.ID) }),
  );
  const deleleArticle = () => {
    delArticleReq();
    setIsDied(true);
  };
  //v-if v-else
  if (isDied) {
    return <div></div>;
  } else {
    return (
      <div className='w-full relative'>
        <ArticleCard
          ID={props.ID}
          Title={props.Title}
          Description={props.Description}
          LikeNumber={props.LikeNumber}
          CommentNumber={props.CommentNumber}
          editMode
        />
        <div className='absolute right-10 top-10'>
          <Link href={'/articleEdit/' + props.ID}>
            <Button variant='outlined'>edit</Button>
          </Link>
          <div className='my-10'></div>
          <Button variant='outlined' onClick={() => deleleArticle()}>
            delete
          </Button>
        </div>
      </div>
    );
  }
}
