import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      password: data.password,
    };
    console.log(userInfo);

    try {
      const res = await axios.post('http://localhost:1000/api/sign-in', userInfo);

      if (res.data) {
        toast.success('Login Successful!');
        localStorage.setItem('Users', JSON.stringify(res.data.id)); 
        localStorage.setItem('Token', JSON.stringify(res.data.token)); 
        navigate('/');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (err) {
      toast.error('Invalid Username or Password.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="bg-slate-700 h-screen">
      <div className="w-full pt-2 p-4">
        <div className="mx-auto space-y-4 md:p-6 md:w-[40%]">
          <div className="flex flex-wrap justify-between">
            <h1 className="text-2xl text-blue-600 hover:text-blue-600 transition duration-500 p-4">
              <i className="fas fa-sign-in-alt fa-fw fa-lg"></i>
              Sign-in
            </h1>
            <Link to="/" className="mt-8 text-blue-600 hover:text-orange-600 transition duration-500">
              <svg className="w-6 h-6 inline-block align-bottom" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Back to Home
              <i className="fas fa-chevron-circle-left fa-fw"></i>
            </Link>
          </div>

          <div className="bg-slate-700 shadow-[0_2px_20px_1px_rgba(256,81,16,1)] rounded px-8 pt-6 pb-8 mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <label htmlFor="username" className="block text-gray-100 text-sm font-bold mb-2">
                  <span className="text-red-500">&nbsp;*</span>
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <input
                    id="username"
                    type="text"
                    {...register('username', { required: true })}
                    className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 transition duration-500 ease-in-out"
                    placeholder="Enter username"
                  />
                </div>
                {errors.username && <strong className="text-red-500 text-xs italic">Username is required</strong>}
              </div>

              <div className="mb-8">
                <label htmlFor="password" className="block text-gray-100 text-sm font-bold mb-2">
                  <span className="text-red-500">&nbsp;*</span>
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <input
                    id="password"
                    type="password"
                    {...register('password', { required: true })}
                    className="block pr-10 shadow appearance-none border-2 border-orange-100 rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 transition duration-500 ease-in-out"
                    placeholder="********"
                  />
                </div>
                {errors.password && <strong className="text-red-500 text-xs italic">Password is required</strong>}
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block space-x-1 text-gray-300 font-bold" htmlFor="remember">
                      <input className="ml-2 leading-tight" type="checkbox" id="remember" name="remember" />
                      <span className="text-sm ">Remember me</span>
                    </label>
                  </div>
                  <div>
                    <a className="font-bold text-sm text-red-500 hover:text-red-600" href="#password-request">
                      Forgot password
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-4 text-center">
                <button type="submit" className="transition duration-500 bg-blue-600 hover:bg-orange-700 text-white text-lg font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
                  Login
                </button>
              </div>
              <hr />
              <div className="mt-8">
                <p className="text-sm  text-gray-100">
                  No account?
                  <Link to="/signup" className="font-bold text-sm text-blue-600 hover:text-orange-800"> Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
