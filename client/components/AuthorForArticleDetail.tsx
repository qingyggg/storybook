import { Avatar, Button } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import { postCommentApi } from '../api/comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentDialog from './AddCommentDialog';

export default function AuthorForArticleDetail(props: propsI) {
  const { UserID, ArticleID, setCommentIsAdd } = props;
  const [Comment, setComment] = useState<string>('');
  const addCommentReq = useRequest(
    postCommentApi({ UserID, ArticleID, Content: Comment }),
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
        <AddCommentDialog
          callback={addComment}
          Comment={Comment}
          onCommentChange={(e) => setComment(e.target.value)}
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
