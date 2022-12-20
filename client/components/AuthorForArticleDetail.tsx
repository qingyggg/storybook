import { Avatar, Button } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import React from 'react'
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddIcon from '@mui/icons-material/Add';
//author info,follow,like/dislike article,add comment
export default function AuthorForArticleDetail() {
  return (
      <div className='w-60 flex flex-col items-center bg-slate-50 py-2 mr-12 space-y-4'>
        <div className='w-full cursor-pointer flex justify-around items-center'>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
          <span className='text-xl'>Marisa Author</span>
        </div>
        <div>
          <Button variant="outlined" endIcon={<AddIcon />}>
            Following
          </Button>
        </div>
        <div>
          <Button variant="outlined" endIcon={<AddCommentIcon />}>
              AddComment
          </Button>
        </div>
      </div>
  )
}
