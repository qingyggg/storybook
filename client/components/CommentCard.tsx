import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Link from 'next/link';
import React from 'react';
import { commentItemI } from '../api/comment/resTypes';

export default function CommentCard({ item, isEditMode = false }: propsT) {
  let extraCommentStyle =
    'hover:transition-all duration-500 ease-in-out hover:shadow-md-10 hover:shadow-blue-600/60 hover:scale-110 hover:bg-blue-600 hover:my-6';
  const commentStyleGetter = () => {
    let baseCommentStyle =
      'w-4/5 flex border-2 border-blue-600 rounded-md p-2 items-center my-2.5';
    return isEditMode
      ? baseCommentStyle
      : baseCommentStyle + ' ' + extraCommentStyle;
  };
  return (
    <div className={commentStyleGetter()}>
      <div className='mr-12 cursor-pointer'>
        <Link href={'/profile/' + item.UserID}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        </Link>
      </div>
      <div>
        <Link href={'/profile/' + item.UserID}>
          <p className='mb-4 text-[#ffb700] cursor-pointer'>{item.UserName}</p>
        </Link>
        <span>{item.Content}</span>
      </div>
    </div>
  );
}
type propsT = {
  item: commentItemI;
  isEditMode?: boolean;
};
