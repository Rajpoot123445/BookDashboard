import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm();

    // State for form fields
    const [imageurl, setImageurl] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [language, setLanguage] = useState("");
    const [desc, setDesc] = useState("");

    const tokenlocal = JSON.parse(localStorage.getItem("Token"));
    const idlocal = JSON.parse(localStorage.getItem("Users"));

    const headers = {
        'authorization': `Bearer ${tokenlocal}`,
        'id': idlocal,
        'bookid': id,
    };

    const onSubmit = async (data) => {
        const bookData = {
            url: imageurl,
            title,
            author,
            price,
            language,
            desc,
        };

        try {
            const res = await axios.put('http://localhost:1000/test/update-books', bookData, { headers });
            toast.success('Book updated successfully!');
            navigate('/all-books');
        } catch (err) {
            toast.error('Internal Server Error.');
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(
                `http://localhost:1000/test/get-by-id/${id}`, { headers }
            );

            const data = res.data.data;
            // Initialize state with fetched data
            setImageurl(data.url);
            setTitle(data.title);
            setAuthor(data.author);
            setPrice(data.price);
            setLanguage(data.language);
            setDesc(data.desc);
        }
        fetch();
    }, [id]);

    return (
        <div className='h-auto'>
            <div className='max-w-4xl mx-auto flex items-center justify-center min-h-screen'>
                <div className='w-full bg-slate-500 shadow-md rounded-lg p-8'>
                    <h3 className='text-2xl font-bold text-center text-yellow-200 mb-6'>Update Book Record</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium'>Publisher</label>
                            <input
                                name='imageurl'
                                type='text'
                                value={imageurl}
                                onChange={(e) => setImageurl(e.target.value)}
                                className='w-full border text-white border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                                placeholder='Enter image url'
                            />
                            {errors.imageurl && <span className='text-red-500'>This field is required</span>}
                        </div>
                        <div>
                            <label className='block text-sm font-medium'>Title</label>
                            <input
                                name='title'
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='w-full border text-white border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                                placeholder='Enter book title'
                            />
                            {errors.title && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div>
                            <label className='block text-sm font-medium '>Author</label>
                            <input
                                name='author'
                                type='text'
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                className='w-full border text-white border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
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
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className='w-full border text-white border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                                    placeholder='Enter price'
                                />
                                {errors.price && <span className='text-red-500'>This field is required</span>}
                            </div>

                            <div className='w-1/2'>
                                <label className='block text-sm font-medium'>Language</label>
                                <input
                                    name='language'
                                    type='text'
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className='w-full border text-white border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                                    placeholder='Enter language'
                                />
                                {errors.language && <span className='text-red-500'>This field is required</span>}
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium'>Published Date</label>
                            <textarea
                                name='desc'
                                rows="4"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className='w-full border text-white border-gray-300 bg-slate-700 px-3 py-2 rounded-md'
                            />
                            {errors.desc && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='mt-6'>
                            <button
                                type='submit'
                                className='w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md'
                            >
                                Update Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBook;
