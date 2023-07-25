import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { articleItemForListI } from '../api/article/resTypes';
import Link from 'next/link';
export default function ArticleCard(props: propI) {
  return (
    <div className='h-48 w-full bg-gray-200 p-4 flex justify-between  hover:shadow-xl rounded-lg'>
      <div className='flex flex-col'>
        <Link
          href={'/detail/' + props.ID}
          className='hover:italic hover:text-violet-600'
        >
          <h1 className='text-2xl'>{props.Title}</h1>
        </Link>
        <span className='text-ellipsis overflow-hidden'>
          {props.Description}
        </span>
      </div>
      <div className='flex'>
        <div className='w-36 h-36 flex flex-col justify-between'>
          <div>
            <FavoriteIcon fontSize='large' />
            <span>{props.LikeNumber}</span>
          </div>
          <div>
            <CommentIcon fontSize='large' />
            <span>{props.CommentNumber}</span>
          </div>
        </div>
        {props.editMode && <div className='mx-10'></div>}
      </div>
    </div>
  );
}

interface propI extends articleItemForListI {
  editMode?: boolean;
}
