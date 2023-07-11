export const AuthActionsType = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  RELOAD_USER: 'RELOAD_USER'
};

export const loginSuccess = (loginParams) => {
  return {
    type: AuthActionsType.LOGIN_SUCCESS,
    payload: loginParams,
  };
};

export const registerSuccess = (regParams) => {
  return {
    type: AuthActionsType.REGISTER_SUCCESS,
    payload: regParams,
  };
};

export const reloadUser = (user) => {
  return {
    type: AuthActionsType.RELOAD_USER,
    payload: user,
  };
};