import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React from 'react';
//avatar,name,content
//TODO:likes,dislike on per comment
//subcomment(reference)
export default function CommentCard() {
  return (
    <div className='w-4/5 flex bg-gray-200 p-2'>
      <div className='mr-12 cursor-pointer'>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
      </div>
      <div>
        {/* TODO:click name or avatar,and redirect to user page that who has been clicked */}
        <p className='mb-4 text-[#ffb700] cursor-pointer'>Alice</p>
        <span>
          People from communities of color are underrepresented in publishing.
          Our books make up less than six percent of the titles released each
          year, and that’s despite a century of fighting against the
          gatekeepers. The results of this systematic exclusion are clear: we
          are also elided from the national conversation, starting in elementary
          school. Those who live in this country are trained by textbooks,
          libraries, classrooms, TV, cinema to see US life as almost exclusively
          white. Certainly literary and intellectual life are constructed to
          make us invisible, and that project is complicit in promoting the
          racist white hegemony that is even now morphing into white nationalist
          fascism.
        </span>
      </div>
    </div>
  );
}
