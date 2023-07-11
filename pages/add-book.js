import AppLayout from '@/components/app-layout/AppLayout';
import TextInput from '@/components/text-input/TextInput';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import { addNewBookAction } from '../store/book/bookActions'
import { resetBookFetch } from '../store/book/bookActionsType'
import { setLoading } from '../store/actions/actions'
import CircularProgress from '@mui/material/CircularProgress';

const AddNewBook = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const { root, bookReducer, authReducer: auth  } = useSelector((state) => state);
  const [imgsSrc, setImgsSrc] = useState([]);
  const [files, setFiles] = useState([]);
  const chooseFileRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    images: [],
    description: '',
    book_created_at: ''
  });

  useEffect(() => {
    if (!auth.isLoggedIn) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    if (bookReducer.isBookFetchCIP) {
      dispatch(resetBookFetch(false))
      router.push('/')
    }
  }, [bookReducer.isBookFetchCIP])

  const resetSelectedImages = () => {
    if (chooseFileRef) {
      chooseFileRef.current.value = "" 
    }
    setImgsSrc([])
    setFiles([])
  }

  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      setFiles([...files, file])
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, { buffer: reader.result, originalname: file.name}]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  const createNewBook = (images = []) => {
    const params = {
      ...formData,
      images
    }
    dispatch(addNewBookAction(params))
  }

  const uploadImages = () => {
    let data = new FormData()
    files.forEach((imgeObj) => {
      data.append('files[]', imgeObj)
    })

    fetch(`${process.env.API_URL}/books/avatar`, {
      method: 'POST',
      body: data
    })
    .then(response => response.json())
    .then(results => {
      createNewBook(results)
    })
    .catch((e) => {
      createNewBook([])
    })
    
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    if (imgsSrc.length) {
      uploadImages()
      return
    }
    createNewBook()
  };

  const updateFormData = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    setFormData({ ...formData, images: imgsSrc });
  }, [imgsSrc]);

  return (
    <form
      onSubmit={submitForm}
      className="w-full h-screen flex justify-center items-center"
    >
      <div className="w-[400px] h-auto bg-gray-600 rounded-2xl py-6 px-4 flex flex-col items-center">
        <span className="text-center text-5xl font-bold text-gray-200 mb-5">
          Add New book
        </span>
        <span className="text-center text-sm text-gray-300"></span>
        <div className="w-full flex flex-col items-center mt-4">
          <TextInput
           id="title"
            required={true}
            type="text"
            fieldName={'title'}
            placeholderText={'Title *'}
            inputValue={formData.title}
            setInputValue={updateFormData}
            className={
              'focus:outline-0 p-3 border-2 border-gray-400 focus-within:border-gray-100 transition duration-[175ms] text-gray-200 rounded-lg bg-inherit w-full h-[60px] mb-3'
            }
          />
          <TextInput
          id="auth"
            required={true}
            type="text"
            fieldName={'author'}
            placeholderText={'Author *'}
            inputValue={formData.author}
            setInputValue={updateFormData}
            className={
              'focus:outline-0 p-3 border-2 border-gray-400 focus-within:border-gray-100 transition duration-[175ms] text-gray-200 rounded-lg bg-inherit w-full h-[60px] mb-3'
            }
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows="5"
            className={
              'focus:outline-0 p-3 border-2 border-gray-400 focus-within:border-gray-100 transition duration-[175ms] text-gray-200 rounded-lg bg-inherit w-full mb-3'
            }
          >
          </textarea>

          {/* <div className="flex justify-start items-start w-full mb-3">
            <Rating
              value={formData.rating}
              onChange={(e) => {
                setFormData({ ...formData, rating: +e.target.value });
              }}
            />
          </div> */}

          <TextInput
          id='date'
            required={true}
            type="date"
            fieldName={'book_created_at'}
            placeholderText={'Publish Date'}
            inputValue={formData.book_created_at}
            setInputValue={updateFormData}
            className={
              'focus:outline-0 p-3 border-2 border-gray-400 focus-within:border-gray-100 transition duration-[175ms] text-gray-200 rounded-lg bg-inherit w-full h-[60px] mb-3'
            }
          />
          <div className="flex justify-start w-full m-3">
            <input
            id="file"
              onChange={onChange}
              type="file"
              name="file"
              multiple
              ref={chooseFileRef}
            />
          </div>
           {
             imgsSrc.length > 0  && 
             <div className="flex justify-end w-full mb-3">
                <button onClick={() => resetSelectedImages()}>
                  <CancelIcon size="20px" />
                </button>
              </div>
           }
          
          <div className="flex flex-start w-full">
            { imgsSrc.length > 0 && 
                imgsSrc.map((image, index) => (
                  <div className="mr-3" key={index}>
                    <Image
                      src={image.buffer}
                      alt={'Book Image'}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </div>
                )) 
            }
          </div>

          { root.isLoading ? 
            <CircularProgress size="30px" className="m-4" /> :
            <button
              type="submit"
              className="bg-gray-800 p-3 rounded-lg hover:bg-gray-900 transition duration-[175ms] flex justify-center items-center w-full mt-4"
            >
              <span className="text-sm font-bold text-gray-200">{'Create Book'}</span>
            </button>
          }
          
        </div>
      </div>
    </form>
  );
};

AddNewBook.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default AddNewBook;
