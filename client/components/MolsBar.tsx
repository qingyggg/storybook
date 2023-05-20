import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import useLocalStorage from '../hooks/useLocalStorage';
import useClientAuth from '../hooks/useClientAuth';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { onClientAuth } = useClientAuth();
  const router = useRouter();
  const [ud] = useLocalStorage('userId');
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    onClientAuth(() => setAnchorEl(event.currentTarget));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const authStatusJSX = useMemo(() => {
    if (ud === '') {
      return (
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              router.push('/profile');
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              router.push('/modify' + ud);
            }}
          >
            modify password
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              router.push('/');
            }}
          >
            my articles
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              router.push('/');
            }}
          >
            my comments
          </MenuItem>
        </Menu>
      );
    } else {
      return <Button color='inherit'>Login</Button>;
    }
  }, [ud]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            storybook
          </Typography>
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            {authStatusJSX}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
