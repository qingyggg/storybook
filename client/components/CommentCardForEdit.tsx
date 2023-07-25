import { commentItemI } from '../api/comment/resTypes';
import CommentCard from './CommentCard';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import { postCommentDeleteApi, postCommentEditApi } from '../api/comment';
import CommentDialog from './CommentDialog';

export default function CommentCardForEdit({ item }: propsT) {
  const [isDied, setIsDied] = useState<boolean>(false);
  const [curCmt, setCurCmt] = useState<string>(item.Content);
  const delReq = useRequest(postCommentDeleteApi({ ID: item.ID }), () => {
    setIsDied(true);
  });
  const editReq = useRequest(
    postCommentEditApi({
      ID: item.ID,
      UserID: item.UserID,
      ArticleID: item.ArticleId,
      Content: curCmt,
    }),
  );
  if (isDied) {
    //current comment is deleted
    return <div></div>;
  } else {
    return (
      <div className='w-6/12 relative'>
        <CommentCard
          key={item.ID}
          item={{ ...item, Content: curCmt }}
          isEditMode={true}
        />
        <div className='flex flex-row absolute right-6 bottom-8'>
          <CommentDialog
            callback={editReq}
            Comment={curCmt}
            onCommentChange={(e) => setCurCmt(e.target.value)}
            cancerCallBack={() => setCurCmt(item.Content)}
            forEdit
          />
          <div className='mx-2'></div>
          <Button variant='outlined' onClick={delReq}>
            delete
          </Button>
        </div>
      </div>
    );
  }
}
type propsT = {
  item: commentItemI;
};
