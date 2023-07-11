import { AppConstants } from '@/constants/appConstants';
import { BookActionsType } from '../book/bookActionsType'

const initialState = {
  allBooks: [],
  readBooks: [],
  readingBooks: [],
  book: null,
  bookRatings: null,
  isBookFetchCIP: false,
  reviewCIP: ''
};

const bookReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {

    case BookActionsType.GET_BOOKS_SUCCESS: {
      return {
        ...state,
        allBooks: action.payload.allBooks,
        readBooks: action.payload.readBooks,
        readingBooks: action.payload.readingBooks
      };
    }

    case BookActionsType.GET_BOOK_SUCCESS: {
      return {
        ...state,
        book: action.payload
      };
    }

    case BookActionsType.GET_BOOK_RATINGS_SUCCESS: {
      return {
        ...state,
        isBookFetchCIP: true,
        bookRatings: action.payload
      };
    }

    case BookActionsType.UPDATE_BOOK_RATINGS_SUCCESS: {
      const bookClone = { ...state.book }
      const bookRatingsClone = { ...state.bookRatings }
      bookClone.ratings = action.payload.count
      bookRatingsClone.count = action.payload.count

      return {
        ...state,
        bookRatings: bookRatingsClone,
        book: bookClone
      };
    }

    case BookActionsType.UPDATE_BOOK: {
      return {
        ...state,
        book: action.payload
      };
    }

    case BookActionsType.SET_REVIEW_CIP: {
      return {
        ...state,
        reviewCIP: action.payload
      };
    }

    case BookActionsType.RESET_BOOK_FETCH: {
      return {
        ...state,
        isBookFetchCIP: action.payload,
      };
    }

    case BookActionsType.RESET_SELECTED_BOOK: {
      return {
        ...state,
        book: action.payload
      };
    }

    case BookActionsType.RESET_BOOKS: {
      return {
        ...state,
        readBooks: [],
        readingBooks: [],
        book: null,
        isBookFetchCIP: false
      };
    }
    
    default:
      return state;
  }
};

export default bookReducer;
