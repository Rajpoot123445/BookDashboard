import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddBook = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const tokenlocal = JSON.parse(localStorage.getItem("Token"));
  const idlocal = JSON.parse(localStorage.getItem("Users"));

  const headers = {
    'authorization': `Bearer ${tokenlocal}`,
    'id': idlocal,
  };

  const onSubmit = async (data) => {
    const bookData = {
      url: data.imageurl,
      title: data.title,
      author: data.author,
      price: data.price,
      language: data.language,
      desc: data.desc,
    };

    try {
      const res = await axios.post('http://localhost:1000/test/books', bookData, { headers });
      toast.success('Book added successfully!');
      navigate('/all-books');
    } catch (err) {
      toast.error('Internal Server Error.');
      console.error('Error:', err);
    }
  };

  return (
    <div className='h-auto'>
      <div className='max-w-4xl mx-auto flex justify-center '>
        <div className='w-full bg-slate-500 shadow-md rounded-lg p-8'>
          <h3 className='text-2xl font-bold text-center text-gray-800 mb-6'>Add New Book</h3>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium'>Publisher</label>
              <input
                name='imageurl'
                type='text'
                {...register('imageurl', { required: true })}
                className='w-full border border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                placeholder='Enter image url'
              />
              {errors.imageurl && <span className='text-red-500'>This field is required</span>}
            </div>
            <div>
              <label className='block text-sm font-medium'>Title</label>
              <input
                name='title'
                type='text'
                {...register('title', { required: true })}
                className='w-full border border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                placeholder='Enter book title'
              />
              {errors.title && <span className='text-red-500'>This field is required</span>}
            </div>

            <div>
              <label className='block text-sm font-medium '>Author</label>
              <input
                name='author'
                type='text'
                {...register('author', { required: true })}
                className='w-full border border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                placeholder='Enter author name'
              />
              {errors.author && <span className='text-red-500'>This field is required</span>}
            </div>
            <div className='flex gap-4'>
              <div className='w-1/2'>
                <label className='block text-sm font-medium'>Price</label>
                <input
                  name='price'
                  type='number'
                  {...register('price', { required: true })}
                  className='w-full border border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                  placeholder='Enter price'
                />
                {errors.price && <span className='text-red-500'>This field is required</span>}
              </div>

              <div className='w-1/2'>
                <label className='block text-sm font-medium'>Language</label>
                <input
                  name='language'
                  type='text'
                  {...register('language', { required: true })}
                  className='w-full border border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                  placeholder='Enter language'
                />
                {errors.language && <span className='text-red-500'>This field is required</span>}
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium'>Published Date</label>
              <textarea
                name='desc'
                type='text'
                rows="3"
                {...register('desc', { required: true })}
                className='w-full border border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
              />
              {errors.desc && <span className='text-red-500'>This field is required</span>}
            </div>

            <div className='mt-6'>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md'
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
