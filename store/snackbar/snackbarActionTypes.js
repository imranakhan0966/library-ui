export const SnackbarActionsType = {
  SHOW_SNACKBAR: 'SHOW_SNACKBAR',
};

export const showSnackbar = (params) => {
  return {
    type: SnackbarActionsType.SHOW_SNACKBAR,
    payload: params,
  };
};