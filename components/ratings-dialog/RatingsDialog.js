import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { AppConstants } from '@/constants/appConstants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RatingsDialog({showDialog, submitResponse, closeDialog, prevRatings}) {
  const [open, setOpen] = React.useState(showDialog);
  const [ratings, setRatings] = React.useState(0);
  const { bookReducer } = useSelector((state) => state);

  React.useEffect(() => {
    setOpen(true);
  }, [showDialog])

  React.useEffect(() => {
    setRatings(prevRatings && prevRatings.count ? prevRatings.count : 0)
  }, [prevRatings])

  const handleClose = (submitToData) => {
    if (!submitToData) {
      closeDialog()
      return
    }
    submitResponse(ratings)
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={'sm'}
        fullWidth={true}
        onClose={() => handleClose(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Rate This Book"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Rating name="simple-controlled" value={ratings} disabled={false} onChange={(e) => setRatings(parseInt(e.target.value))} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={bookReducer.reviewCIP === AppConstants.INPROCRESS} onClick={() => handleClose(false)}>No, Thanks</Button>
          { !bookReducer.reviewCIP || bookReducer.reviewCIP == AppConstants.DONE ? 
            <Button onClick={() => handleClose(true)}>Yes, Submit</Button> :
            <CircularProgress size="20px" className="m-3" />
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}