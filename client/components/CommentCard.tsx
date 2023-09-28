import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { commentItemI } from '../api/comment/resTypes';
import useLocalStorage from '../hooks/useLocalStorage';
import { idTransform } from '../util/common';

export default function CommentCard({ item, isEditMode = false }: propsT) {
  let extraCommentStyle =
    'hover:transition-all duration-500 ease-in-out hover:shadow-md-10 hover:shadow-blue-600/60 hover:scale-110 hover:bg-blue-600 hover:my-6 w-4/5';
  const curUserCmtStyle = 'border-red-300 hover:bg-red-100';
  const [userId] = useLocalStorage('userId');
  const commentStyleGetter = useMemo(() => {
    let baseCommentStyle =
      'flex border-2 border-blue-600 rounded-md p-2 items-center my-2.5';
    return isEditMode
      ? baseCommentStyle
      : baseCommentStyle +
          ' ' +
          extraCommentStyle +
          (idTransform(userId) === item.UserID ? ' ' + curUserCmtStyle : '');
  }, [userId]);

  return (
    <div className={commentStyleGetter}>
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
