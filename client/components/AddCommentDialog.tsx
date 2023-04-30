import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@mui/material';
import React from 'react';

export default function AddCommentDialog({
  handleClickClose,
  handleClickOpen,
  open,
}: propTypes) {
  return (
    <div>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleClickClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
interface propTypes {
  open: boolean;
  handleClickClose: () => any;
  handleClickOpen: () => any;
}
