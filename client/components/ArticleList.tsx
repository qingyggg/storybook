import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { articleListType } from '../api/article/resTypes';
import { likesStatus } from '../api/comment/resTypes';

export default function ArticleList(props: PropI) {
  const renderList = () => {
    if (props.list.length === 0) {
      return (
        <h1 className='text-2xl'>
          there nothing article in here,so lets write something here!!!
        </h1>
      );
    } else {
      return (
        <div className='w-8/12 space-y-6'>
          {props.list.map((v) => (
            <ArticleCard {...v} key={v.ID} />
          ))}
          <div className='mt-4'></div>
        </div>
      );
    }
  };
  return renderList();
}
interface PropI {
  list: articleListType;
  // likesStatus: likesStatus;
}
