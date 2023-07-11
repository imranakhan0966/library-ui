import { gql } from '@apollo/client';

export const SUBSCRIBE_BOOK_RATINGS = gql`
  subscription {
    addBookRatingsSubscription {
      user_id
      user_name
      book_name
      count
    }
  }
`

// const subscribeBook = () => {
//   const {data, error, loading} = useSubscription(SUBSCRIBE_BOOK_RATINGS) 
// }
