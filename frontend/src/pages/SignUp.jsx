import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const SignUp = () => {
  const lox = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
    };

    try {
      const res = await axios.post('http://localhost:1000/api/sign-up', userInfo);

      if (res.data.user) {
        toast.success('SignUp Successfully!!!!!!!');
        lox('/login'); 
      } else {
        toast.error('User data not found in response.');
      }
    } catch (err) {
      toast.error('Internal Server error..');
      console.error('Error:', err); // Log any errors
    }
  };

  return (
    <div className='bg-slate-700 h-auto'>
      <div className='font-[sans-serif] max-w-4xl flex items-center mx-auto md:min-h-screen'>
        <div className='grid md:grid-cols-3 items-center shadow-[0_2px_20px_1px_rgba(16,81,250,1)] rounded-xl overflow-hidden'>
          <div className='max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-slate-950 to-slate-800 lg:px-8 px-4 py-4'>
            <div>
              <h4 className='text-white text-lg font-semibold'>Create Your Account</h4>
              <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>
                Welcome to our registration page! Get started by creating your account.
              </p>
            </div>
            <div>
              <h4 className='text-white text-lg font-semibold'>Simple & Secure Registration</h4>
              <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>
                Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.
              </p>
            </div>
          </div>

          <form className='md:col-span-2 w-full py-2 px-6 sm:px-16' onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
              <h3 className='text-yellow-100 text-2xl text-center font-bold'>Sign Up</h3>
            </div>

            <div className='space-y-2'>
              <div>
                <label className='text-gray-800 text-sm mb-2 block'>Username</label>
                <div className='relative flex items-center'>
                  <input
                    name='name'
                    type='text'
                    {...register('name', { required: true })}
                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    placeholder='Enter username'
                  />
                </div>
                {errors.name && <span className='text-red-500'>This Username field is required</span>}
              </div>

              <div>
                <label className='text-gray-800 text-sm mb-2 block'>Email</label>
                <div className='relative flex items-center'>
                  <input
                    name='email'
                    type='email'
                    {...register('email', { required: true })}
                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    placeholder='Enter email'
                  />
                </div>
                {errors.email && <span className='text-red-500'>This Email field is required</span>}
              </div>

              <div>
                <label className='text-gray-800 text-sm mb-2 block'>Password</label>
                <div className='relative flex items-center'>
                  <input
                    name='password'
                    type='password'
                    {...register('password', { required: true })}
                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    placeholder='Enter password'
                  />
                </div>
                {errors.password && <span className='text-red-500'>This Password field is required</span>}
              </div>
              <div>
                <label className='text-gray-800 text-sm mb-2 block'>Address</label>
                <textarea
                  name='address'
                  rows='3'
                  {...register('address', { required: true })}
                  className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                  placeholder='Enter Address'
                />
                {errors.address && <span className='text-red-500'>This Address field is required</span>}
              </div>
            </div>

            <div className='!mt-12'>
              <button type='submit' className='bg-blue-600 w-full py-2.5 rounded-lg text-white font-bold text-sm'>
                 Sign Up
              </button>
              <p className='text-gray-400 text-sm text-center mt-3'>
                Already have an account? <Link to='/login' className='text-blue-400'>Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
