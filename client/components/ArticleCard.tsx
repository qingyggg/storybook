import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import StarRateIcon from '@mui/icons-material/StarRate';
import { articleItemForListI, articleListType } from '../api/article/resTypes';
export default function ArticleCard(props: propI) {
  return (
    <div className='h-48 w-full bg-gray-200 p-4 flex justify-between'>
      <div className='flex flex-col'>
        <h1 className='text-2xl'>{props.Title}</h1>
        <span className='text-ellipsis overflow-hidden'>
          {props.Description}
        </span>
      </div>
      <div className='w-36 h-36 flex flex-col justify-between'>
        <div>
          <FavoriteIcon fontSize='large' />
          <span>{props.LikeNumber}</span>
        </div>
        <div>
          <CommentIcon fontSize='large' />
          <span>{props.LikeNumber}</span>
        </div>
      </div>
    </div>
  );
}

interface propI extends articleItemForListI {}
