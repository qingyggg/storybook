import React, { useEffect, useLayoutEffect, useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Dialog, DialogTitle, Link } from '@mui/material';
import { useRouter } from 'next/router';
import { showProfileApi } from '../../api/user';
import { showProfileI } from '../../api/user/resTypes';
import { idTransform } from '../../util/common';
import { useNewRequest } from '../../hooks/useNewRequest';
import { getFollowedListApi, getFollowingListApi } from '@/api/userBehavior';
import { followList } from '@/api/userBehavior/resTypes';
import FollowList from '@/components/FollowList';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const [Profile, setProfile] = useState<showProfileI>();
  const [followingList, setFollowingList] = useState<followList>();
  const [followedList, setFollowedList] = useState<followList>();
  const [followDialogIsOpen, setFollowDialogIsOpen] = useState<boolean>(false);
  const [followDialogTitle, setFollowDialogTitle] = useState<
    'following' | 'followed'
  >('following');
  const molsRequest = useNewRequest();
  const showProfile = () =>
    molsRequest(showProfileApi(idTransform(id)), true).then((res) =>
      setProfile(res),
    );
  const getFollowingList = () =>
    molsRequest(getFollowingListApi(idTransform(id)), true).then((res) =>
      setFollowingList(res),
    );
  const getFollowedList = () =>
    molsRequest(getFollowedListApi(idTransform(id)), true).then((res) =>
      setFollowedList(res),
    );
  useEffect(() => {
    if (idTransform(id) === -1) {
      // return "cnm ,nextjs!!!"
      return;
    }
    const api = async () => {
      //get original profile content
      (await showProfile)();
      (await getFollowedList)();
      (await getFollowingList)();
    };
    api();
  }, [id]);
  //complete before 4pm
  return (
    <div className='w-full flex flex-col items-center mt-5'>
      {Profile && followedList && followingList && (
        <>
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
            <div>
              <span className='font-bold '>Follow:</span>
              <div className='flex flex-row'>
                <div
                  className='text-lg cursor-pointer hover:text-pink-400 hover:underline'
                  onClick={() => {
                    setFollowDialogTitle('followed');
                    setFollowDialogIsOpen(true);
                  }}
                >
                  <span className=' font-semibold '>
                    {Profile.FollowedNumber}&nbsp;
                  </span>
                  <span className='text-gray-500 hover:text-cyan-400'>
                    followed
                  </span>
                </div>
                <div className='mx-8'></div>
                <div
                  className='text-lg cursor-pointer hover:text-pink-400 hover:underline'
                  onClick={() => {
                    setFollowDialogTitle('following');
                    setFollowDialogIsOpen(true);
                  }}
                >
                  <span className=' font-semibold '>
                    {Profile.FollowingNumber}&nbsp;
                  </span>
                  <span className='text-gray-500 hover:text-cyan-400'>
                    following
                  </span>
                </div>
              </div>
            </div>
            <div className='flex flex-row'>
              <span className='font-bold '>Contact:</span>
              <div className='px-5'></div>
              <Link href={Profile.Github} underline='none'>
                <GitHubIcon fontSize='large' className='scale-150' />
              </Link>
              <div className='mx-8'></div>
              <Link href={Profile.Twitter} underline='none'>
                <TwitterIcon
                  fontSize='large'
                  className='scale-150'
                ></TwitterIcon>
              </Link>
            </div>
          </div>
          <Dialog
            onClose={() => setFollowDialogIsOpen(false)}
            open={followDialogIsOpen}
          >
            <DialogTitle>{followDialogTitle} list</DialogTitle>
            <FollowList
              list={
                followDialogTitle === 'following' ? followingList : followedList
              }
              followSignal={followDialogTitle}
              onRedirect={(uid: number) => {
                setFollowDialogIsOpen(false);
                router.push('/profile/' + uid);
              }}
            />
          </Dialog>
        </>
      )}
    </div>
  );
}
