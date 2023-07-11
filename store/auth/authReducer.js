import { AuthActionsType } from './authActionsType';
import { useRouter } from 'next/router';


const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
};


const authReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {

    case AuthActionsType.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload
      };
    }

    case AuthActionsType.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload
      };
    }

    case AuthActionsType.RELOAD_USER: {
      return {
        ...state,
        isLoggedIn: !!action.payload,
        token: action.payload ? action.payload.token : null,
        user: action.payload || null
      };
    }

    default:
      return state;
  }
};

export default authReducer;
