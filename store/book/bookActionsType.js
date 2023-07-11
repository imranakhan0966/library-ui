export const BookActionsType = {
  GET_BOOKS_SUCCESS: 'GET_BOOKS_SUCCESS',
  RESET_BOOKS: 'RESET_BOOKS',
  GET_BOOK_SUCCESS: 'GET_BOOK_SUCCESS',
  GET_BOOK_RATINGS_SUCCESS: 'GET_BOOK_RATINGS_SUCCESS',
  UPDATE_BOOK_RATINGS_SUCCESS: 'UPDATE_BOOK_RATINGS_SUCCESS',
  UPDATE_BOOK: 'UPDATE_BOOK',
  RESET_BOOK_FETCH: 'RESET_BOOK_FETCH',
  RESET_SELECTED_BOOK: 'RESET_SELECTED_BOOK',
  SET_REVIEW_CIP: 'SET_REVIEW_CIP'
};

export const getBookSuccess = (books) => {
  return {
    type: BookActionsType.GET_BOOKS_SUCCESS,
    payload: books,
  };
};

export const resetBooksState = () => {
  return {
    type: BookActionsType.RESET_BOOKS
  };
};

export const getSelectedBookSuccess = (params) => {
  return {
    payload: params,
    type: BookActionsType.GET_BOOK_SUCCESS
  };
};

export const getSelectedBookRatingsSuccess = (params) => {
  return {
    payload: params,
    type: BookActionsType.GET_BOOK_RATINGS_SUCCESS
  };
};

export const updateBookRatings = (params) => {
  return {
    payload: params,
    type: BookActionsType.UPDATE_BOOK_RATINGS_SUCCESS
  };
};

export const resetSelectedBook = (params) => {
  return {
    payload: params,
    type: BookActionsType.RESET_SELECTED_BOOK
  };
};

export const updateBook = (params) => {
  return {
    payload: params,
    type: BookActionsType.UPDATE_BOOK
  };
};

export const resetBookFetch = (params) => {
  return {
    payload: params,
    type: BookActionsType.RESET_BOOK_FETCH
  };
};

export const setReviewCIP = (params) => {
  return {
    payload: params,
    type: BookActionsType.SET_REVIEW_CIP
  };
};