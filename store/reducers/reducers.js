import { combineReducers } from 'redux';
import authReducer from '../auth/authReducer';
import bookReducer from '../book/bookReducer';
import snackbarReducer from '../snackbar/snackbarReducer'
import { SET_LOADING } from '../actions/actions';

const initialState = {
  isLoading: false
};

function root(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  root,
  authReducer,
  bookReducer,
  snackbarReducer
});

export default rootReducer;