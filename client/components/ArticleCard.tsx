import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import StarRateIcon from '@mui/icons-material/StarRate';
export default function ArticleCard() {
  return (
    <div className='h-48 w-full bg-gray-200 p-4 flex justify-between'>
      <div className='flex flex-col'>
        <h1 className='text-2xl'>Alice story1</h1>
        <span className='text-ellipsis overflow-hidden'>
          styled-components is the result of wondering how we could enhance CSS
          for styling React component systems. By focusing on a single use case
          we managed to optimize the experience for developers as well as the
          output for end users.
        </span>
      </div>
      <div className='w-36 h-36 flex flex-col justify-between'>
        <div>
          <FavoriteIcon fontSize='large' />
          <span>16</span>
        </div>
        <div>
          <CommentIcon fontSize='large' />
          <span>16</span>
        </div>
        <div>
          <StarRateIcon fontSize='large' />
          <span>27</span>
        </div>
      </div>
    </div>
  );
}
