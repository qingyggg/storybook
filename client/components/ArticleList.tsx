import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import { articleListType } from '../api/article/resTypes';
import { likesStatus } from '../api/comment/resTypes';
import { Skeleton } from 'antd';

export default function ArticleList(props: PropI) {
  const renderList = () => {
    if (props.isLoading) {
      return Array.apply(null, Array(10)).map((v, k) => (
        <Skeleton key={k} avatar paragraph={{ rows: 4 }} active />
      ));
    } else {
      if (props.list.length === 0) {
        return (
          <h1 className='text-2xl'>
            there nothing article in here,so lets write something here!!!
          </h1>
        );
      } else {
        return (
          <>
            {props.list.map((v) => (
              <ArticleCard {...v} key={v.ID} />
            ))}
          </>
        );
      }
    }
  };

  return (
    <div className='w-8/12 space-y-6'>
      {renderList()}
      <div className='mt-4'></div>
    </div>
  );
}
interface PropI {
  list: articleListType;
  isLoading?: boolean;
}
