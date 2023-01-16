import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// to access the data of the user form and validate that user data using useformik
import { useFormik } from 'formik'; 

import styles from '../styles/Username.module.css';
import { resetPasswordValidation } from '../helper/validate';
import { resetPassword } from '../helper/helper';
import { useAuthStore } from '../store/store';
import useFetch from '../hooks/fetch.hook'

export default function Reset() {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')


  const formik = useFormik({
    initialValues: {
      password : '',
      confirm_pwd : ''
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      // console.log(values)

      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...!',
        success: <b>Reset Successful...!</b>,
        error: <b>Could not Reset.</b>
      });

      resetPromise.then(function(){
        navigate('/password')
      })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        
        <div className={styles.glass} style={{ width: "50%" }}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'> 
              Enter new password.
            </span>
          </div>

          <form className='pt-20' onSubmit={formik.handleSubmit}>

            <div className="textbox flex flex-col items-center gap-6">

              {/* {...} => spread operator, used to to pass all the props of a parent component to a child component  */}
              <input {...formik.getFieldProps('password')} className={styles.textbox} type="text" placeholder='New Password' />
              <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="text" placeholder='Confirm Password' />
              <button className={styles.btn} type='submit'>Reset</button>
            </div>

          </form>

        </div>

      </div>
    </div>
  )
}
