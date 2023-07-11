import { setLoading } from '../actions/actions';
import { getBookSuccess, getSelectedBookSuccess, getSelectedBookRatingsSuccess, updateBookRatings, setReviewCIP, resetBookFetch } from '../book/bookActionsType';
import { GET_ALL_BOOKS_GQL, ADD_COLLECTIONS_GQL, UPDATE_COLLECTIONS_GQL, ADD_BOOK_GQL, ADD_BOOK_RATINGS_GQL, GET_BOOK_RATINGS_GQL } from '../../graphql/mutations'
import { BOOK_BY_ID_GQL, BOOK_AND_COLLECTION_BY_ID_GQL } from '../../graphql/queries'
import { apolloClient } from '../../graphql/apollo-client'
import { AppConstants } from '@/constants/appConstants';
import { showSnackbar } from '../snackbar/snackbarActionTypes'

export const getBooksAction = (params) => (dispatch) => {
  dispatch(setLoading(true));
  return apolloClient
    .mutate({
      mutation: GET_ALL_BOOKS_GQL,
      variables: { getAllBooksArgs: params },
    })
    .then((res) => {
      const { allBooks } = res.data;
      const updRes = processBookList(allBooks)
      dispatch(getBookSuccess(updRes));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err.message || err);
      dispatch(setLoading(false));
    });
};

export const getBookByIdAction = (bookId) => (dispatch) => {
  dispatch(setLoading(true));
  return apolloClient
    .query({
      query: BOOK_BY_ID_GQL,
      variables: { bookId: bookId },
    })
    .then((res) => {
      const { bookById } = res.data;
      dispatch(getSelectedBookSuccess(bookById));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err.message || err);
      dispatch(setLoading(false));
    });
};

export const getBooksByIdAction = (bookId, userId) => (dispatch) => {
  dispatch(setLoading(true));
  return apolloClient
    .query({
      query: BOOK_AND_COLLECTION_BY_ID_GQL,
      variables: { bookId: bookId, userId: userId},
    })
    .then((res) => {
      const { bookCollectionById } = res.data;
      const book = prepareBookData(bookCollectionById)
      dispatch(getSelectedBookSuccess(book));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      console.log(err.message || err);
      dispatch(showSnackbar(defaultAlertsParams(err.message || 'error', 'error')))
      dispatch(setLoading(false));
    });
};

export const addBookToCollection = (params, updBook) => (dispatch) => {
  return apolloClient
    .mutate({
      mutation: ADD_COLLECTIONS_GQL,
      variables: { addCollectionArgs: params },
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err.message || err);
    });
};

export const updateBookCollection = (params, updBook) => (dispatch) => {
  return apolloClient
    .mutate({
      mutation: UPDATE_COLLECTIONS_GQL,
      variables: { updateCollectionArgs: params },
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err.message || err);
    });
};

export const addNewBookAction = (params) => (dispatch) => {
  return apolloClient
    .mutate({
      mutation: ADD_BOOK_GQL,
      variables: { addBookArgs: params },
    })
    .then((res) => {
      const { addBook } = res.data;
      dispatch(getSelectedBookSuccess(addBook));
      dispatch(showSnackbar(defaultAlertsParams()))
      dispatch(resetBookFetch(true));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      dispatch(showSnackbar(defaultAlertsParams(err.message || 'error', 'error')))
      console.log(err.message || err);
    });
};

export const addBookRatings = (params) => (dispatch) => {
  dispatch(setReviewCIP(AppConstants.INPROCRESS));
  return apolloClient
    .mutate({
      mutation: ADD_BOOK_RATINGS_GQL,
      variables: { addBookRatingsArgs: params },
    })
    .then((res) => {
      dispatch(updateBookRatings(params));
      dispatch(setReviewCIP(AppConstants.DONE));
      getBooksByIdAction(params.book_id, params.user_id)
    })
    .catch((err) => {
      dispatch(setReviewCIP(AppConstants.DONE));
      dispatch(updateBookRatings(params));
      dispatch(showSnackbar(defaultAlertsParams(err.message || 'error', 'error')))
      console.log(err.message || err);
    });
};

export const getBookRatings = (params) => (dispatch) => {
  return apolloClient
    .mutate({
      mutation: GET_BOOK_RATINGS_GQL,
      variables: { getBookRatingsArgs: params },
    })
    .then((res) => {
      const { getBookRatings } = res.data;
      dispatch(getSelectedBookRatingsSuccess(getBookRatings));
      dispatch(setLoading(false));
    })
    .catch((err) => {
      dispatch(setLoading(false));
      dispatch(getSelectedBookRatingsSuccess({count: 0, book_id: params.book_id}));
      console.log(err.message || err);
    });
};


const processBookList = (booksRes) => {
  const {books, book_collection} = booksRes
  const results = {
    allBooks: [],
    readBooks: [],
    readingBooks: []
  }

  books.forEach(book => {
    const isExistInCollection = book_collection.find((collection) => collection.book_id == book.id)
    if (isExistInCollection) {
      if (isExistInCollection.status == AppConstants.READ) {
        results.readBooks.push({...book, status: AppConstants.READ})

      } else if (isExistInCollection.status == AppConstants.READING) {
        results.readingBooks.push({...book, status: AppConstants.READING})
      } else if (isExistInCollection.status == AppConstants.WANTREAD) {
        results.allBooks.push({...book, status: AppConstants.WANTREAD})
      }
      return
    }
    results.allBooks.push({...book, status: AppConstants.WANTREAD})
  });

  return results
}

const prepareBookData = (bookCollection) => {
  const  { ratings } = bookCollection
  let ratingsTotal  = 0

  let bookDetails = {
    ...bookCollection.book, 
    collectionId: bookCollection.collection.id, 
    status: bookCollection.collection.status
  }

  ratings.forEach((rating) => {
    ratingsTotal += rating.count 
  })

  const overallRatings = ratingsTotal / ratings.length

  return { ...bookDetails, ratings: overallRatings, ratingsCount: ratings.length, ratingsTotal }
}

const defaultAlertsParams = (message = "Success", type = "success") => {
  return {
    message,
    type,
    show: true,
    duration: 5000
  }
}