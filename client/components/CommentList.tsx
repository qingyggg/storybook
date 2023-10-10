import CommentCard from './CommentCard';
import React from 'react';
import { commentListT } from '../api/comment/resTypes';
import { Divider } from '@mui/material';

export default function CommentList(props: propsT) {
  return (
    <div className='w-4/5'>
      <h1 className='text-blue-600 text-4xl hover:cursor-pointer'>
        # <span className='text-pink-400'>{props.count}</span> comments:
      </h1>
      <Divider />
      <div className='w-full flex flex-col  items-center mt-6'>
        {props.list.map((v) => (
          <CommentCard key={v.ID} item={v} />
        ))}
      </div>
      <div className='mt-4'></div>
    </div>
  );
}

type propsT = {
  readonly list: commentListT;
  readonly count: number;
};
