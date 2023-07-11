
import { setLoading } from '../actions/actions';
import { loginSuccess, registerSuccess, reloadUser } from '../auth/authActionsType';
import { getBooksAction } from '../book/bookActions';
import { resetBooksState } from '../book/bookActionsType'
import { LOGIN_USER_GQL, REGISTER_USER_GQL } from '../../graphql/mutations'
import { apolloClient } from '../../graphql/apollo-client'
import { LocalStorageConstants } from '../../constants/localStorageContants'
import { showSnackbar } from '../snackbar/snackbarActionTypes'

export const loginUserAction = (params) => (dispatch) => {
  dispatch(setLoading(true));
  return apolloClient
    .mutate({
      mutation: LOGIN_USER_GQL,
      variables: { getUserArgs: params },
    })
    .then((res) => {
      const { login } = res.data;
      localStorage.setItem(LocalStorageConstants.user, JSON.stringify(login))
      localStorage.setItem(LocalStorageConstants.token, login.token)
      const booksParams = getAllBooksParams(login)
      dispatch(getBooksAction(booksParams))
      dispatch(loginSuccess(login));
      dispatch(showSnackbar(defaultAlertsParams()))
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err.message || err);
      dispatch(showSnackbar(defaultAlertsParams(err.message || 'error', 'error')))
      dispatch(setLoading(false));
    });
};

export const registerUserAction = (params) => (dispatch) => {
  dispatch(setLoading(true));
  return apolloClient
    .mutate({
      mutation: REGISTER_USER_GQL,
      variables: { addUserArgs: params },
    })
    .then((res) => {
      const { register } = res.data;
      localStorage.setItem(LocalStorageConstants.user, JSON.stringify(register))
      localStorage.setItem(LocalStorageConstants.token, register.token)
      const booksParams = getAllBooksParams(register)
      dispatch(getBooksAction(booksParams))
      dispatch(registerSuccess(register));
      dispatch(showSnackbar(defaultAlertsParams()))
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err.message || err);
      dispatch(showSnackbar(defaultAlertsParams(err.message || 'error', 'error')))
      dispatch(setLoading(false));
    });
};

export const reloadUserAction = () => (dispatch) => {
  const data = JSON.parse(localStorage.getItem(LocalStorageConstants.user))
  dispatch(reloadUser(data || null));
  const booksParams = getAllBooksParams(data || null)
  dispatch(getBooksAction(booksParams))
};

export const logoutUserAction = () => (dispatch) => {
  localStorage.removeItem(LocalStorageConstants.user)
  localStorage.removeItem(LocalStorageConstants.token)
  dispatch(reloadUser(null));
  dispatch(resetBooksState());
};


const getAllBooksParams = (userParams, searchStr = '') => {
  return {
    user_id: userParams && userParams.id ? userParams.id :  0,
    sort: 'ASC',
    search_text: searchStr,
  }
}

const defaultAlertsParams = (message = "Success", type = "success") => {
  return {
    message,
    type,
    show: true,
    duration: 5000
  }
}