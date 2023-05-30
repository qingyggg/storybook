import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useClientAuth from '../hooks/useClientAuth';
import { useRouter } from 'next/router';
import Link from 'next/dist/client/link';
import useStatelessStorage from '../hooks/useStatelessStorage';
import useLogout from '../hooks/useLogout';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { onClientAuth } = useClientAuth();
  const router = useRouter();
  const [ud] = useStatelessStorage('userId');
  const logout = useLogout();
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    onClientAuth(() => {
      setAnchorEl(event.currentTarget);
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
            <Link href='/'>Storybook for Alice</Link>
          </Typography>
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
          <div>
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
                  router.push('/profile/' + ud());
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  router.push('/modify/' + ud());
                }}
              >
                modify password
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  router.push('/articleCreate');
                }}
              >
                write story
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
              <MenuItem
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
