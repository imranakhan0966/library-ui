import { gql } from '@apollo/client';


export const BOOK_BY_ID_GQL = gql`
  query GetBookById($bookId: Int!) {
    bookById (
      bookId: $bookId
    ) {
      title
      images
      ratings
      book_created_at
      author
      description
    }
  }
`


export const BOOK_AND_COLLECTION_BY_ID_GQL = gql`
  query bookCollectionById($bookId: Int!, $userId: Int!) {
    bookCollectionById(bookId: $bookId, userId: $userId) {
      book {
        id
        title
        images
        ratings
        book_created_at
        author
        description 
      }
      collection {
        id
        status
      }
      ratings {
        count
        book_id
      }
    }
  }
`