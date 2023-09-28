import { TextField, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { editProfileApi, loginApi, showProfileApi } from '../../api/user';
import Auth from '../../components/Auth';
import { useRequest } from '../../hooks/useRequest';
import { editProfileI, profileI } from '../../api/user/reqTypes';
import { idTransform } from '../../util/common';

export default function ProfileEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [Profile, setProfile] = useState<editProfileI>(nullProfile);
  const editProfileReq = useRequest(editProfileApi(Profile), (res) =>
    router.push('/'),
  );
  const profileShowReq = useRequest(
    showProfileApi(idTransform(id)),
    (res) => {
      setProfile(res!);
    },
    () => {},
    true,
  );
  const editProfile = async () => {
    (await editProfileReq)();
  };
  useEffect(() => {
    if (idTransform(id) === -1) {
      // return "cnm ,react!!!"
      return;
    }
    setProfile({ UserId: idTransform(id) });
  }, [id]);
  return (
    <Auth>
      <>
        <h1 className='text-4xl mb-3 '>Profile Edit</h1>
        <TextField
          id='standard-basic'
          label='name'
          variant='outlined'
          margin='dense'
          value={Profile.Name}
          onChange={(e) =>
            setProfile((ps) => {
              ps.Name = e.target.value;
              return ps;
            })
          }
        />
        <TextField
          id='standard-basic'
          label='age'
          variant='outlined'
          margin='dense'
          value={Profile.Age}
          type='number'
          onChange={(e) =>
            setProfile((ps) => {
              ps.Age = parseInt(e.target.value);
              return ps;
            })
          }
        />
        <TextField
          id='standard-basic'
          label='description'
          variant='outlined'
          margin='dense'
          value={Profile.Description}
          multiline
          onChange={(e) =>
            setProfile((ps) => {
              ps.Description = e.target.value;
              return ps;
            })
          }
        />
        <TextField
          id='standard-basic'
          label='github-link'
          variant='outlined'
          margin='dense'
          value={Profile.Github}
          onChange={(e) =>
            setProfile((ps) => {
              ps.Github = e.target.value;
              return ps;
            })
          }
        />
        <TextField
          id='standard-basic'
          label='twitter-link'
          variant='outlined'
          margin='dense'
          value={Profile.Twitter}
          onChange={(e) =>
            setProfile((ps) => {
              ps.Twitter = e.target.value;
              return ps;
            })
          }
        />
        <div className='my-1'></div>
        <Button variant='outlined' onClick={editProfile}>
          submit
        </Button>
      </>
    </Auth>
  );
}
const nullProfile: editProfileI = {};
