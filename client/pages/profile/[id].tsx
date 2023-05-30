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
    if (idTransform(id) === 0) {
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
      <h1 className='text-5xl'>user profile</h1>
      <div className='flex flex-col text-2xl'>
        <p>name:{Profile.Name}</p>
        <p>age:{Profile.Age}</p>
        <p>Description:{Profile.Description}</p>
        <div className='flex flex-row'>
          <Link href={Profile.Github} underline='none'>
            <GitHubIcon fontSize='large' />
          </Link>
          <div className='mx-8'></div>
          <Link href={Profile.Twitter} underline='none'>
            <TwitterIcon fontSize='large'></TwitterIcon>
          </Link>
        </div>
      </div>
    </div>
  );
}
const nullProfile: editProfileI = {};
