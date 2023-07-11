import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const BookCard = ({ book }) => {
  const router = useRouter();

  const getImageSource = (book) => {
    return book && book.images.length ? book.images[0] : '/book-thumbnail.png';
  };

  return (
    <div
      onClick={() => router.push(`/books/${book.id}`)}
      className="flex flex-col justify-start items-center cursor-pointer"
    >
      <div className="w-auto h-auto sm:w-auto sm:h-auto mb-4 sm:mb-0">
        <Image
          src={getImageSource(book)}
          alt={'Book Image'}
          width={155}
          height={160}
          className={'rounded-md mb-2 w-[300px] h-[300px] sm:w-auto sm:h-auto'}
        />
      </div>
      <div className="capitalize text-gray-800 font-semibold">
        {book.title || ''}
      </div>
      <div className="capitalize text-gray-600">{book.author || ''}</div>
      <div className="capitalize text-gray-500 font-semibold">
        {book.status || ''}
      </div>
    </div>
  );
};

export default BookCard;
