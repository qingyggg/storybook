import { commentItemI } from '../api/comment/resTypes';
import CommentCard from './CommentCard';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useRequest } from '../hooks/useRequest';
import { postCommentDeleteApi } from '../api/comment';
import Link from 'next/link';

export default function CommentCardForEdit({ item }: propsT) {
  const [isDied, setIsDied] = useState<boolean>(false);
  const delReq = useRequest(postCommentDeleteApi({ ID: item.ID }), () => {
    setIsDied(false);
  });
  if (isDied) {
    //current comment is deleted
    return <div></div>;
  } else {
    return (
      <div>
        <CommentCard key={item.ID} item={item} isEditMode={true} />
        <div>
          <Link href={'/detail/' + item.ArticleId}>
            <Button variant='outlined'>edit</Button>
          </Link>
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
