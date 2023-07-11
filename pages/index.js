import AppLayout from '@/components/app-layout/AppLayout';
import { useEffect, useState } from 'react';
import BookCard from '@/components/book-card/BookCard';
import { useRouter } from 'next/router';
import { reloadUserAction } from '../store/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
      // Will be passed to the page component as props
    },
  };
}
function Home() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { authReducer: auth, bookReducer } = useSelector((state) => state);

  useEffect(() => {
    dispatch(reloadUserAction());
  }, []);

  const changeTabs = (index) => {
    if (selectedIndex === index) return;
    setSelectedIndex(index);
  };

  return (
    <div className="w-full h-full">
      {auth.isLoggedIn && (
        <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-between lg:items-center mx-10">
          <ul className="flex justify-center items-center">
            <li className="mr-2">
              <div
                onClick={() => changeTabs(0)}
                aria-current="page"
                className={`inline-block  text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center cursor-pointer ${
                  selectedIndex === 0
                    ? 'active dark:bg-gray-800 dark:text-gray-200'
                    : 'dark:text-gray-500  dark:hover:bg-gray-800 dark:hover:text-gray-300'
                } `}
              >
                Want To Read
              </div>
            </li>
            <li className="mr-2">
              <div
                onClick={() => changeTabs(1)}
                className={`inline-block  text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center cursor-pointer ${
                  selectedIndex === 1
                    ? 'active dark:bg-gray-800 dark:text-gray-200'
                    : 'dark:text-gray-500  dark:hover:bg-gray-800 dark:hover:text-gray-300'
                } `}
              >
                Reading
              </div>
            </li>
            <li className="mr-2">
              <div
                onClick={() => changeTabs(2)}
                className={`inline-block  text-blue-600 rounded-t-lg py-4 px-4 text-sm font-medium text-center cursor-pointer ${
                  selectedIndex === 2
                    ? 'active dark:bg-gray-800 dark:text-gray-200'
                    : 'dark:text-gray-500  dark:hover:bg-gray-800 dark:hover:text-gray-300'
                } `}
              >
                Read
              </div>
            </li>
          </ul>
          <button
            onClick={() => router.push('/add-book')}
            className="bg-gray-800 p-3 rounded-lg hover:bg-gray-900 transition duration-[175ms] flex justify-center items-center w-[150px] mt-4"
          >
            <span className="text-sm font-bold text-gray-200">
              {t('add_book')}
            </span>
          </button>
        </div>
      )}

      <div
        className={`flex flex-col justify-center sm:justify-start sm:flex-row flex-wrap gap-10 m-10`}
      >
        {selectedIndex === 0 && (
          <>
            {bookReducer.allBooks.length ? (
              bookReducer.allBooks.map((book, index) => (
                <BookCard key={index} book={book} />
              ))
            ) : (
              <div className="w-full  flex justify-center">
                No Books Available in this section
              </div>
            )}
          </>
        )}
        {selectedIndex === 1 && (
          <>
            {bookReducer.readingBooks.length ? (
              bookReducer.readingBooks.map((book, index) => (
                <BookCard key={index} book={book} />
              ))
            ) : (
              <div className="w-full flex justify-center">
                No Books Available in this section
              </div>
            )}
          </>
        )}
        {selectedIndex === 2 && (
          <>
            {bookReducer.readBooks.length ? (
              bookReducer.readBooks.map((book, index) => (
                <BookCard key={index} book={book} />
              ))
            ) : (
              <div className="w-full flex justify-center">
                No Books Available in this section
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default Home;
