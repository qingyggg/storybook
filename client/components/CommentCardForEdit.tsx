import { commentItemI } from '../api/comment/resTypes';
import CommentCard from './CommentCard';
import { Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import { postCommentDeleteApi, postCommentEditApi } from '../api/comment';
import CommentDialog from './CommentDialog';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CommentCardForEdit(props: propsT) {
  const { item } = props;
  const [isDied, setIsDied] = useState<boolean>(false);
  const [curCmt, setCurCmt] = useState<string>(item.Content);
  const router = useRouter();
  const delReq = useRequest(postCommentDeleteApi({ ID: item.ID }), () => {
    setIsDied(true);
  });
  const editReq = useRequest(
    postCommentEditApi({
      ID: item.ID,
      UserID: item.UserID,
      ArticleID: item.ArticleID,
      Content: curCmt,
    }),
  );
  const arDetailPath = useMemo(
    () => `/detail/${item.ArticleID}`,
    [item.ArticleID],
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
          <Button
            variant='outlined'
            onClick={() => {
              router.push(arDetailPath);
            }}
          >
            article link
          </Button>
          <div className='mx-2'></div>
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
