import { SnackbarActionsType } from './snackbarActionTypes';

const initialState = {
  duration: 5000,
  show: false,
  type: '',
  message: ''
};

const snackbarReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {

    case SnackbarActionsType.SHOW_SNACKBAR: {
      return {
        ...state,
        duration: action.payload.duration || 5000,
        show: action.payload.show,
        type: action.payload.type,
        message: action.payload.message
      };
    }

    default:
      return state;
  }
};

export default snackbarReducer;
