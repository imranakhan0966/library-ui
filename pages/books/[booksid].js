import AppLayout from '@/components/app-layout/AppLayout';
import Carousel from '@/components/carousel/Carousel';
import Image from 'next/image';
import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getBooksByIdAction, addBookToCollection, updateBookCollection, getBookRatings, addBookRatings } from '../../store/book/bookActions'
import { resetSelectedBook, setReviewCIP } from '../../store/book/bookActionsType'
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ButtonGroup from '@/components/group-button/GroupButton'; 
import RatingsDialog from '@/components/ratings-dialog/RatingsDialog'; 
import { AppConstants } from '../../constants/appConstants'

const BookDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { booksid: bookId } = router.query
  const { root, bookReducer, authReducer: auth  } = useSelector((state) => state);
  const [bookDetails, setBookDetails] = useState(null)
  const [showRatingDialog, setRatingDialog] = useState(false)
  
  useEffect(() => {
    getSelectedBookDetails()
    getUserBookRatings()

    return () => {
      dispatch(resetSelectedBook(null))
    }
  }, [])

  useEffect(() => {
    if (bookReducer.book) {
      setBookDetails(bookReducer.book)
    }
  }, [bookReducer.book])

  useEffect(() => {
    if (bookReducer.reviewCIP == AppConstants.DONE) {
      setRatingDialog(false)
      dispatch(setReviewCIP(''))
    }
  }, [bookReducer.reviewCIP])

  // Get selected books details
  const getSelectedBookDetails = () => {
    if (!bookId) {
      router.push('/')
      return
    }
    const userId = auth.user && auth.user.id ? auth.user.id :  0
    dispatch(getBooksByIdAction(parseInt(bookId), userId))
  }

  // Get rating on book by loggedin user
  const getUserBookRatings = () => {
    if (!bookId) {
      router.push('/')
      return
    }
    const userId = auth.user && auth.user.id ? auth.user.id :  0
    dispatch(getBookRatings({
      book_id: parseInt(bookId), 
      user_id: userId
    }))
  }

  const menuOptionChanged = (selectedOption) => {
    const updBook = {...bookDetails, status: selectedOption }
    const params = prepareParams(selectedOption)

    if (!bookDetails.collectionId) {
      dispatch(addBookToCollection(params, updBook))
      return
    } 

    dispatch(updateBookCollection(params, updBook))
  }

  const prepareParams = (selectedOption) => {
    return bookDetails.collectionId ? 
    {
      id: bookDetails.collectionId,
      status: selectedOption
    } : {
      book_id: bookDetails.id,
      user_id: auth.user && auth.user.id ? auth.user.id : 0,
      status: selectedOption
    }
  }

  const submitRating = (rating) => {
    const params = {
      user_id: auth.user && auth.user.id ? auth.user.id : 0,
      book_id: bookDetails.id,
      count: rating
    }

    if (!params.user_id)  return
    dispatch(addBookRatings(params))
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start p-14 gap-x-32">
      { bookDetails && !root.isLoading &&
        <>
          <div className="flex flex-col justify-start items-center">
            { bookDetails && bookDetails?.images.length ? 
              <Carousel images={bookDetails.images} /> :
              <Image
                src='/book-thumbnail.png'
                alt={'Book Image'}
                width={250}
                height={300}
                className={'rounded-md'}
              />
            }
            
            { !auth.isLoggedIn ? 
              <button className="bg-gray-800 p-3 rounded-lg hover:bg-gray-900 transition duration-[175ms] flex justify-center items-center w-[240px] mt-4">
                <span className="capitalize text-sm font-bold text-gray-200">
                  {bookDetails?.status || AppConstants.WANTREAD}
                </span>
              </button> : 
              <div className="mt-5 mb-5">
                <ButtonGroup
                  selectedOption={bookReducer?.book?.status || AppConstants.WANTREAD}
                  updatedValue={(value) => menuOptionChanged(value)}
                ></ButtonGroup>
              </div>
            }

            { auth.isLoggedIn &&
              <button onClick={() => setRatingDialog(true)} className="bg-gray-900 p-3 rounded-lg hover:bg-gray-500 transition duration-[175ms] flex justify-center items-center w-[190px] mt-2">
                <span className="capitalize text-sm font-bold text-gray-200">
                  Finish Book
                </span>
              </button>
            }
            
          </div>
          <div className="flex flex-col justify-start items-start mb-5">
            <span className="capitalize text-[50px] font-bold">
              {bookDetails?.title || ''}
            </span>
            <span className="capitalize text-[20px]">
              {bookDetails?.author || ''}
            </span>
            <Rating name="simple-controlled" value={bookDetails.ratings || 0} disabled={true} />
            <span className="max-w-[750px] mt-2">{bookDetails?.description || ''}</span>
          </div>
        </>
      }

      { root.isLoading && 
        <div className="w-full flex justify-center items-center h-40">
          <CircularProgress color="primary"/> 
        </div>
      }

      { showRatingDialog && 
        <RatingsDialog 
          showDialog={showRatingDialog}
          prevRatings={bookReducer.bookRatings}
          submitResponse={(value) => submitRating(value)}
          closeDialog={() => setRatingDialog(false)}
        />
      }
      
    </div>
  );
};

BookDetails.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default BookDetails;
