import React, { useEffect, useLayoutEffect, useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';
import { showProfileApi } from '@/api/user';
import { editProfileI } from '@/api/user/reqTypes';
import { showProfileI } from '../../api/user/resTypes';
import { useRequest } from '../../hooks/useRequest';
import { dataConsumer, idTransform } from 'util/common';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

//bug logic
export const getServerSideProps = (async (context) => {
  const uid = context.params?.id;
  //error log:showProfile api is not defined
  //error log:showProfile api is not defined
  //error log:showProfile api is not defined
  //error log:showProfile api is not defined
  const { data } = await showProfileApi(idTransform(uid))();
  console.log(data);
  const profile = dataConsumer(data);
  return { props: { profile: nullProfile } };
}) satisfies GetServerSideProps<{
  profile: editProfileI;
}>;

export default function Profile({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // const router = useRouter();
  // const { id } = router.query;
  // const [profile, setProfile] = useState<editProfileI>(nullProfile);
  // const showProfile = useRequest<showProfileI>(
  //   showProfileApi(idTransform(id)),
  //   (res) => setProfile(res!),
  //   () => void 0,
  //   true,
  // );
  // useEffect(() => {
  //   if (idTransform(id) === -1) {
  //     // return "cnm ,react!!!"
  //     return;
  //   }
  //   const api = async () => {
  //     //get original profile content
  //     (await showProfile)();
  //   };
  //   api();
  // }, [id]);
  return (
    <div className='w-full flex flex-col items-center mt-5'>
      <h1 className='text-5xl'>user profile</h1>
      <div className='flex flex-col text-2xl'>
        <p>name:{profile.Name}</p>
        <p>age:{profile.Age}</p>
        <p>Description:{profile.Description}</p>
        <div className='flex flex-row'>
          <Link href={profile.Github} underline='none'>
            <GitHubIcon fontSize='large' />
          </Link>
          <div className='mx-8'></div>
          <Link href={profile.Twitter} underline='none'>
            <TwitterIcon fontSize='large'></TwitterIcon>
          </Link>
        </div>
      </div>
    </div>
  );
}
const nullProfile: editProfileI = {};
