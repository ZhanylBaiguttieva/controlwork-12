import React, { useState } from 'react';
import { Button, Menu, MenuItem, Avatar, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { apiURL } from '../constants.ts';
import { User } from '../types';
import { useAppDispatch } from '../app/hooks.ts';
import { logout } from '../features/users/usersThunk.ts';


interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  let avatarImage;

  if (user.avatar) {
    avatarImage = apiURL + '/' + user.avatar;
  }

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Avatar alt={user.displayName} src={avatarImage} />
        <Button color="inherit" onClick={handleClick}>
          {user.displayName}
        </Button>
      </Stack>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem>Profile</MenuItem>
        <MenuItem component={NavLink} to="/users/:id" color="inherit">My gallery</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;