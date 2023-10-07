import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { articleItemForListI } from '../api/article/resTypes';
import Link from 'next/link';
import { StarRateRounded } from '@mui/icons-material';

const extraStyle =
  'hover:transition-all  duration-500 ease-in-out hover:-translate-x-16 hover:rotate-1 hover:bg-indigo-100 hover:border-dashed';
const basicClassnames =
  'h-48 w-full border-2 border-indigo-500/100 p-4 flex justify-between  hover:shadow-xl rounded-lg';
export default function ArticleCard(props: propI) {
  const cardStyle = () => {
    if (props.editMode) {
      return basicClassnames;
    } else {
      return basicClassnames + ' ' + extraStyle;
    }
  };
  return (
    <div className={cardStyle()}>
      <div className='flex flex-col'>
        <Link
          href={'/detail/' + props.ID}
          className='hover:italic hover:text-violet-600'
        >
          <h1 className='text-2xl'>{props.Title}</h1>
        </Link>
        <Link
          href={'/detail/' + props.ID}
          className='hover:italic hover:text-violet-600'
        >
          <span className='text-ellipsis overflow-hidden'>
            {props.Description}
          </span>
        </Link>
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
          <div>
            <StarRateRounded fontSize='large' />
            <span>{props.CollectNumber}</span>
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
