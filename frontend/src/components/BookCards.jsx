import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'

const BookCards = ({ data,favourite }) => {
    const tokenlocal = JSON.parse(localStorage.getItem("Token"));
    const idlocal = JSON.parse(localStorage.getItem("Users"));
    const headers = {
        'authorization': `Bearer ${tokenlocal}`,
        'id': idlocal,
        'bookid': data._id
    };
    const RemoveFav = async () =>{
        await axios.delete("http://localhost:1000/add/remove-favourite", { headers });
    }
    return (
        <div className='p-6 bg-slate-900 rounded-md hover:scale-105 hover:shadow-xl transition-all duration-300 '>
            <Link to={`/all-books/${data._id}`}>
                <div className='flex items-center justify-center'> <img src={data.url} alt="img" className='h-[28vh] w-[80vw] md:w-[20vw]' /> </div>
                <div className='px-1 my-4 space-y-1'>
                    <h1 className='text-xl text-yellow-100'> {data.title} </h1>
                    <h1 className='text-gray-400 font-semibold'> By: {data.author} </h1>
                    <p className='text-xl text-yellow-100 text-right'> $ {data.price} </p>
                </div>
            </Link>
            {
                favourite && <div className='w-full bg-red-500 text-yellow-300 text-center rounded-md p-1 font-semibold text-md'>
                    <button className='w-full' onClick={RemoveFav}>Remove from Favourite</button>
                </div>
            }
        </div>
    )
}

export default BookCards