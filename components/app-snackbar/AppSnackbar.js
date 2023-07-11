import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import {showSnackbar } from '../../store/snackbar/snackbarActionTypes'

export default function AppSnackbar() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const { snackbarReducer  } = useSelector((state) => state);
  const defaultParams = {
    duration: 5000,
    show: false,
    type: '',
    message: ''
  }

  React.useEffect(() => {
    setOpen(snackbarReducer.show);
    if (snackbarReducer.show) {
      setTimeout(() => dispatch(showSnackbar(defaultParams)), defaultParams.duration) 
    }
  }, [snackbarReducer.show])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      { snackbarReducer.type !== '' &&
        <Snackbar
          open={open}
          autoHideDuration={7000}
          onClose={handleClose}
          message={snackbarReducer.message}
          action={action}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={snackbarReducer.type} sx={{ width: '100%' }}>
            { snackbarReducer.message }
          </Alert>
        </Snackbar>
      }
        
    </div>
  );
}