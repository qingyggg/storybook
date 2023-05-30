import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Link from 'next/link';
import React from 'react';
import { commentItemI } from '../api/comment/resTypes';

export default function CommentCard({ item }: propsT) {
  return (
    <div className='w-4/5 flex bg-gray-200 p-2 items-center'>
      <div className='mr-12 cursor-pointer'>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
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
};
