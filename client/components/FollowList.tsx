import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { followList } from '@/api/userBehavior/resTypes';

interface propsI {
  list: followList;
  followSignal: 'following' | 'followed';
  onRedirect: (uid: number) => void;
}

export default function FollowList({ list, followSignal, onRedirect }: propsI) {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 600,
        minWidth: 600,
        bgcolor: 'background.paper',
      }}
    >
      {list.length > 0 ? (
        list.map((v) => (
          <>
            <ListItem
              alignItems='flex-start'
              className='hover:text-blue-400 cursor-pointer hover:bg-pink-50'
              onDoubleClick={() => onRedirect(v.UserID)} //()=>((uid:number)=>....)(v.UserID)
            >
              <ListItemAvatar>
                <Avatar
                  alt='Alice Avatar'
                  src='https://avatars.githubusercontent.com/u/65453020?s=400&u=30b84c580166dbbcf7554093b3bce1c89a8186c6&v=4'
                />
              </ListItemAvatar>
              <ListItemText
                primary={v.Name}
                secondary={
                  <div>
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='text.primary'
                    >
                      bio
                    </Typography>
                    {v.Description}
                  </div>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </>
        ))
      ) : (
        <p className='p-3.5'>
          {followSignal === 'following'
            ? "oops,there's nothing user your are following,so lets follow someone:)"
            : 'sorry,none of the people followed you:( '}{' '}
        </p>
      )}
    </List>
  );
}
