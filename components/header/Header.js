import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserAction } from '../../store/auth/authActions';
import { useRouter } from 'next/router';
import  ar from "../../public/locales/ar/common.json";
import en from "../../public/locales/en/common.json";


const Header = () => {
  const router = useRouter();
  const { authReducer: auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const translation =  { ar, en }
  const { header_text, sign_up, logout, sign_in, welcome }  = translation[router.locale || 'en']

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logoutUserAction());
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-30 w-full px-2 py-4 bg-white sm:px-4 shadow-xl mb-5">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Link href="/">
          <span className="text-2xl font-extrabold text-gray-800">
            { header_text }
          </span>
        </Link>

        {!auth.isLoggedIn && (
          <div className="flex justify-center items-center space-x-1">
            <ul className=" space-x-2 inline-flex">
              <li className="p-2">
                <Link
                  href="/auth/signup"
                  className=" font-semibold text-gray-600 rounded hover:text-gray-700 cursor-pointer"
                >
                  { sign_up }
                </Link>
              </li>
              <li className="p-2">
                <Link
                  href="/auth/signin"
                  className="px-4 py-2 font-semibold text-gray-600 rounded hover:text-gray-700 cursor-pointer"
                >
                  {sign_in}
                </Link>
              </li>
              <li
                className={`${
                  router.locale == 'en' ? 'bg-gray-500' : 'bg-inherit'
                } p-2 rounded-md`}
              >
                <Link
                  locale="en"
                  href="/"
                  className={`pr-2 ${
                    router.locale == 'en'
                      ? 'font-semibold text-white '
                      : 'font-semibold text-gray-500'
                  } rounded cursor-pointer`}
                >
                  English
                </Link>
              </li>
              <li
                className={`${
                  router.locale == 'ar' ? 'bg-gray-500' : 'bg-inherit'
                } p-2 rounded-md`}
              >
                <Link
                  locale="ar"
                  href="/"
                  className={`font-semibold ${
                    router.locale == 'ar'
                      ? 'font-semibold text-white '
                      : 'font-semibold text-gray-500'
                  } cursor-pointer`}
                >
                  عربي
                </Link>
              </li>
            </ul>
          </div>
        )}

        {auth.isLoggedIn && (
          <div className="flex items-center space-x-1">
            <span>
              {welcome}, {auth?.user?.name || ''}
            </span>
            <ul className="flex items-center">
              <li>
                <Link
                  onClick={(e) => handleClick(e)}
                  href="/auth/signup"
                  className="px-4 py-2 font-semibold text-gray-600 rounded hover:text-gray-700 cursor-pointer"
                >
                  {logout}
                </Link>
              </li>
              <li
                className={`${
                  router.locale == 'en' ? 'bg-gray-500' : 'bg-inherit'
                } p-2 rounded-md`}
              >
                <Link
                  locale="en"
                  href="/"
                  className={`pr-2 ${
                    router.locale == 'en'
                      ? 'font-semibold text-white '
                      : 'font-semibold text-gray-500'
                  } rounded cursor-pointer`}
                >
                  English
                </Link>
              </li>
              <li
                className={`${
                  router.locale == 'ar' ? 'bg-gray-500' : 'bg-inherit'
                } p-2 rounded-md`}
              >
                <Link
                  locale="ar"
                  href="/"
                  className={`font-semibold ${
                    router.locale == 'ar'
                      ? 'font-semibold text-white '
                      : 'font-semibold text-gray-500'
                  } cursor-pointer`}
                >
                  عربي
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
