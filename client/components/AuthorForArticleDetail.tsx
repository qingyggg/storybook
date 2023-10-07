import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import { postCommentApi } from '../api/comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentDialog from './CommentDialog';
import { showProfileI } from '../api/user/resTypes';
import {
  FavoriteBorder,
  StarRateRounded,
  StarBorderRounded,
} from '@mui/icons-material';

export default function AuthorForArticleDetail(props: propsI) {
  const {
    onCmtAdd,
    likeStatus,
    onClickForLike,
    collectStatus,
    onClickForCollect,
  } = props;
  const [comment, setComment] = useState<string>('');

  return (
    <div className='flex flex-col items-start  py-2 mr-12 space-y-4 border-2 p-6 rounded-xl border-indigo-400 hover:bg-indigo-50'>
      <div className='w-full cursor-pointer flex  items-center'>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        <div className='mr-5'></div>
        <span className='text-xl'>{props?.authorInfo?.Name}</span>
      </div>
      <div>
        <CommentDialog
          callback={() => onCmtAdd(comment)}
          Comment={comment}
          onCommentChange={(e) => setComment(e.target.value)}
        />
      </div>
      <Button
        onClick={onClickForLike}
        variant='outlined'
        size='medium'
        color={likeStatus ? 'secondary' : 'primary'}
        startIcon={
          likeStatus ? (
            <FavoriteIcon fontSize='large' className='bg-inherit' />
          ) : (
            <FavoriteBorder fontSize='large' />
          )
        }
      >
        &nbsp;&nbsp;{likeStatus ? 'liked' : 'like'}&nbsp; &nbsp;
      </Button>
      <Button
        onClick={onClickForCollect}
        variant='outlined'
        size='medium'
        color={collectStatus ? 'secondary' : 'primary'}
        startIcon={
          collectStatus ? (
            <StarRateRounded fontSize='large' className='bg-inherit' />
          ) : (
            <StarBorderRounded fontSize='large' className='bg-inherit' />
          )
        }
      >
        &nbsp;&nbsp;{collectStatus ? 'collected' : 'collect'}&nbsp; &nbsp;
      </Button>
    </div>
  );
}

interface propsI {
  AuthorID: number;
  ArticleID: number;
  likeStatus: boolean;
  collectStatus: boolean;
  onClickForLike: () => any;
  onClickForCollect: () => any;
  onCmtAdd: (data: string) => any;
  authorInfo: showProfileI;
  ReaderID: number;
}
