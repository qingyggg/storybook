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

export default function CommentDialog(props: propsI) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (isCancel: boolean) => {
    setOpen(false);
    if (!isCancel) {
      props.callback();
    } else if (props.cancerCallBack) {
      props.cancerCallBack();
    }
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        {props.forEdit && 'edit'}
        {!props.forEdit && 'comment'}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.forEdit && 'edit '}comment</DialogTitle>
        <DialogContent>
          <DialogContentText>please input your comment</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='comment'
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
  cancerCallBack?: () => any;
  Comment: string;
  onCommentChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => any;
  forEdit?: boolean;
}
