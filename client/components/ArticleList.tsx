import React from 'react'
import ArticleCard from './ArticleCard'

export default function ArticleList() {
  return (
    <div className='w-8/12 space-y-6'>
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard />
      <ArticleCard/>
    </div>
  )
}
