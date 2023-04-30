import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from '@mui/material';
export default function Profile() {
  return (
    <div className='w-full flex flex-col items-center mt-5'>
      <h1 className='text-5xl'>user profile</h1>
      <div className='flex flex-col text-2xl'>
        <p>name:alice</p>
        <p>age:20</p>
        <p>Description:balabala</p>
        <div className='flex flex-row'>
          <Link href='#' underline='none'>
            <GitHubIcon fontSize='large' />
          </Link>
          <div className='mx-8'></div>
          <Link href='#' underline='none'>
            <TwitterIcon fontSize='large'></TwitterIcon>
          </Link>
        </div>
      </div>
    </div>
  );
}
