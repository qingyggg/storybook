import React, { useEffect, useState } from 'react';
import { commentListT } from '../../api/comment/resTypes';
import CommentCardForEdit from '../../components/CommentCardForEdit';
import { useRequest } from '../../hooks/useRequest';
import { getMyCommentListApi, postCommentDeleteApi } from '../../api/comment';

function Index() {
  const [comments, setComments] = useState<commentListT>([]);
  const cmtReq = useRequest(getMyCommentListApi('6'), (v) => {
    setComments(v!);
  });
  useEffect(() => {
    cmtReq();
  }, []);
  return (
    <div className='flex flex-col items-center mt-6'>
      <h1 className='text-blue-600 text-4xl hover:cursor-pointer'>
        my-comments
      </h1>
      <div className='w-full flex flex-col  items-center mt-4'>
        {comments.map((v) => (
          <CommentCardForEdit item={v} key={v.ID} />
        ))}
      </div>
      <div className='mt-4'></div>
    </div>
  );
}

export default Index;
