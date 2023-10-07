import React, { useEffect, useLayoutEffect, useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import { showProfileApi } from '../../api/user';
import { editProfileI } from '../../api/user/reqTypes';
import { showProfileI } from '../../api/user/resTypes';
import { useRequest } from '../../hooks/useRequest';
import { idTransform } from '../../util/common';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [Profile, setProfile] = useState<editProfileI>(nullProfile);
  const showProfile = useRequest<showProfileI>(
    showProfileApi(idTransform(id)),
    (res) => setProfile(res!),
    () => void 0,
    true,
  );
  useEffect(() => {
    if (idTransform(id) === -1) {
      // return "cnm ,react!!!"
      return;
    }
    const api = async () => {
      //get original profile content
      (await showProfile)();
    };
    api();
  }, [id]);
  //complete before 4pm
  return (
    <div className='w-full flex flex-col items-center mt-5'>
      <h1 className='text-8xl mb-10 hover:cursor-pointer'>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        {Profile.Name}'s profile
      </h1>
      <div className='space-y-16 w-4/12 text-4xl'>
        <p>
          <span className='font-bold '>name:</span>
          {Profile.Name}
        </p>
        <p>
          <span className='font-bold '>age:</span>
          {Profile.Age}
        </p>
        <p>
          <span className='font-bold '>Description:</span>
          <span className='text-xl'>{Profile.Description}</span>
        </p>
        <div className='flex flex-row'>
          <span className='font-bold '>Contact:</span>
          <div className='px-5'></div>
          <Link href={Profile.Github} underline='none'>
            <GitHubIcon fontSize='large' className='scale-150' />
          </Link>
          <div className='mx-8'></div>
          <Link href={Profile.Twitter} underline='none'>
            <TwitterIcon fontSize='large' className='scale-150'></TwitterIcon>
          </Link>
        </div>
      </div>
    </div>
  );
}
const nullProfile: editProfileI = {};
