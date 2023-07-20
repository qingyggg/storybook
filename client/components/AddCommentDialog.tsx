import { ChangeEvent, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

export default function AddCommentDialog(props: propsI) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isCancel: boolean) => {
    setOpen(false);
    if (!isCancel) {
      props.callback();
    }
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        comment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>comment</DialogTitle>
        <DialogContent>
          <DialogContentText>please input your comment</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='title'
            type='text'
            fullWidth
            variant='standard'
            value={props.Comment}
            onChange={props.onCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)}>Cancel</Button>
          <Button onClick={() => handleClose(false)}>submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

interface propsI {
  callback: () => any;
  Comment: string;
  onCommentChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => any;
}
