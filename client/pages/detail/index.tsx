import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CommentCard from '../../components/CommentCard'
import AliceSpeedDial from '../../components/AliceSpeedDial'
import AuthorForArticleDetail from '../../components/AuthorForArticleDetail'

const markdown = `
A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`
export default function index() {
  return (
    <div className='w-full flex-row flex'>
      <div className='w-4/5 flex-col flex items-center bg-cyan-200'>
        <h1 className='text-4xl'>i am the tile</h1>
        <div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
        <div className='w-full flex flex-col space-y-4 items-center mt-6'>
          <CommentCard />
          <CommentCard />
          <CommentCard/>
        </div>
      </div>
      <div className='fixed top-28 right-8'>
        <AuthorForArticleDetail/>
      </div>
    </div>
  )
}
