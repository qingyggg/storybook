import ArticleCard from './ArticleCard';
import { Button } from '@mui/material';
import { articleItemForListI } from '../api/article/resTypes';
import { useState } from 'react';

export default function ArticleCardForCollect(props: propsI) {
  const [isDied, setIsDied] = useState<boolean>(false);
  const unColArticle = () => {
    props.onUnColArticle(props.ID);
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
          CollectNumber={props.CollectNumber}
          editMode
        />
        <div className='absolute right-10 top-10'>
          <Button variant='outlined' onClick={() => unColArticle()}>
            uncollect
          </Button>
        </div>
      </div>
    );
  }
}
interface propsI extends articleItemForListI {
  onUnColArticle: (id: number) => any;
}
