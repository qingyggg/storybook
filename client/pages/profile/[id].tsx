adimport React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from '@mui/material';
import { editProfileI } from '@/api/user/reqTypes';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { serRequest } from '../../util/serRequest';
import { showProfileApi } from '@/api/user';
import { idTransform } from '../../util/common';
import { showProfileI } from '@/api/user/resTypes';

//bug logic
export const getServerSideProps = (async (context) => {
  const uid = context.params?.id;
  const res = await serRequest(showProfileApi(idTransform(uid)));
  if (res === 'notfound') {
    return {
      notFound: true,
    };
  } else {
    return { props: { profile: res } };
  }
}) satisfies GetServerSideProps<{
  profile: showProfileI;
}>;

export default function Profile({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
