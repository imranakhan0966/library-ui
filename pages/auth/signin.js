import AuthLayout from '@/components/auth-layout/AuthLayout';
import TextInput from '@/components/text-input/TextInput';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../../store/auth/authActions'
import CircularProgress from '@mui/material/CircularProgress';

function SignIn() {
  const router = useRouter();
  const dispatch = useDispatch()
  const { root, authReducer: auth } = useSelector(
    (state) => state
  );
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (auth.isLoggedIn) {
      router.push('/');
    }
  }, [auth.isLoggedIn])

  const signIn = async (e) => {
    e.preventDefault();
    dispatch(loginUserAction(formData))
  };

  const updateFormData = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <form
      onSubmit={signIn}
      className="w-full h-full flex justify-center items-center"
    >
      <div className="w-[400px] h-auto bg-gray-600 rounded-2xl py-6 px-4 flex flex-col items-center">
        <span className="text-center text-5xl font-bold text-gray-200 mb-5">
          Sign In
        </span>
        <span className="text-center text-sm text-gray-300">
          Sign in using your email and password
        </span>
        <div className="w-full flex flex-col items-center mt-4">
          <TextInput
            // data-cy=""
            datacy ="error-email"
            required={true}
            type="email"
            fieldName={'email'}
            placeholderText={'Email'}
            inputValue={formData.email}
            setInputValue={updateFormData}
            className={
              'error-e focus:outline-0 p-3 border-2 border-gray-400 focus-within:border-gray-100 transition duration-[175ms] text-gray-200 rounded-lg bg-inherit w-full h-[60px]'
            }
          />
          <TextInput
            //  data-cy=""
             datacy ="error-pswd"
            required={true}
            type="password"
            fieldName={'password'}
            placeholderText={'Password'}
            inputValue={formData.password}
            setInputValue={updateFormData}
            className={
              'error-p focus:outline-0 p-3 border-2 border-gray-400 focus-within:border-gray-100 transition duration-[175ms] text-gray-200 rounded-lg bg-inherit w-full h-[60px] mt-3'
            }
          />
          <button
          data-cy="submit"
            type="submit"
            className="bg-gray-800 p-3 rounded-lg hover:bg-gray-900 transition duration-[175ms] flex justify-center items-center w-full mt-4"
          >
          { root.isLoading ? 
            <CircularProgress size="20px" color="primary"/> :
            <span className="text-sm font-bold text-gray-200">{'Sign In'}</span>
          }
          </button>
          
          <span className="text-gray-200 text-sm text-center mt-2">
            {"Don't have an account? "}
            <span
              onClick={() => router.push('/auth/signup')}
              className="cursor-pointer text-gray-200 hover:text-gray-300 transition duration-[175ms] font-bold"
            >
              Sign Up
            </span>
          </span>
        </div>
      </div>
    </form>
  );
}

SignIn.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default SignIn;
