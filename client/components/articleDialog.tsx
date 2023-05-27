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

export default function ArticleDialog(props: propsI) {
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
        {props.dialogButton}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.dialogContent}</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='title'
            type='text'
            fullWidth
            variant='standard'
            value={props.Title}
            onChange={props.onTitleChange}
          />
          <TextField
            type='text'
            autoFocus
            margin='dense'
            id='description'
            label='description'
            fullWidth
            variant='standard'
            value={props.Description}
            onChange={props.onDescriptionChange}
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
  dialogTitle: string;
  dialogContent: string;
  dialogButton: string;
  Title: string;
  Description: string;
  onTitleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => any;
  onDescriptionChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => any;
}
