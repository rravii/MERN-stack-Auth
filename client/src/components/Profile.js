import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';

// to access the data of the user form and validate that user data using useformik
import { useFormik } from 'formik';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helper/helper';

export default function Profile() {

  const [file, setFile] = useState()
  const [{ isLoading, apiData, serverError}] = useFetch();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || '',
      lastName: apiData?.lastName || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || ''
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      // inside values we are also going to have this profile property
      values = await Object.assign(values, { profile: file || apiData?.profile || '' })
      console.log(values);
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading: "Updating...",
        success: <b>Update Successful...!</b>,
        error: <b>Could not Update!</b>
      });

    }
  })

  // formik doesn't support file upload so we need to create this handler
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function 
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

        <div class="relative rounded-full h-20 w-20 mt-5 flex items-center justify-center text-white ml-auto hover:bg-blue-500 hover:text-white">
            <div class="absolute inset-0 rounded-full bg-indigo-500 opacity-75"></div>
            <div class="relative z-10"><Link to='/todo'>ToDo</Link></div>
        </div>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>

        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '3em' }}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              You can update the details.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor="profile">
                <img src={apiData?.profile || file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>

              <input onChange={onUpload} type="file" id="profile" name="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">

              {/* {...} => spread operator, used to to pass all the props of a parent component to a child component  */}

              <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
              </div>

              <div className='name flex w-3/4 gap-10'>
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
              </div>

              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
              <button className={styles.btn} type='submit'>Update</button>

            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Come back later? <button onClick={userLogout} className='text-red-500'>Logout</button></span>
            </div>

          </form>

        </div>

      </div>
    </div>
  )
}
