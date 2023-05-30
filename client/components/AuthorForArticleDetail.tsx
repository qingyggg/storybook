import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState } from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommentDialog from './CommentDialog';
import { useRequest } from '../hooks/useRequest';
import { postCommentApi } from '../api/comment';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function AuthorForArticleDetail(props: propsI) {
  const { UserID, ArticleID, setCommentIsAdd } = props;
  const [comment, setComment] = useState<string>('');
  const addCommentReq = useRequest(
    postCommentApi({ UserID, ArticleID, Content: comment }),
    () => {
      setCommentIsAdd(true);
    },
  );
  const addComment = () => {
    addCommentReq();
  };
  return (
    <div className='w-60 flex flex-col items-center bg-slate-50 py-2 mr-12 space-y-4'>
      <div className='w-full cursor-pointer flex justify-around items-center'>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
        <span className='text-xl'>Marisa Author</span>
      </div>
      <div>
        <CommentDialog
          callback={addComment}
          dialogTitle='add comment'
          dialogContent='please write your comment'
          dialogButton='add comment'
          Content={comment}
          onContentChange={(e) => setComment(e.target.value)}
          ButtonIcon={<AddCommentIcon />}
        />
      </div>
      <FavoriteIcon fontSize='large' />
    </div>
  );
}
interface propsI {
  UserID: number;
  ArticleID: number;
  setCommentIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
}
