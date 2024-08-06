import React from 'react'
import { Link } from 'react-router-dom'

const BookCards = ({ data }) => {
    return (
        <div className='p-6 bg-slate-900 rounded-md hover:scale-105 hover:shadow-xl transition-all duration-300 '>
            <Link to={data._id}>
                <div className='flex items-center justify-center'> <img src={data.url} alt="img" className='h-[28vh] w-[20vw]' /> </div>
                <div className='px-2 my-4 space-y-1'>
                    <h1 className='text-2xl text-yellow-100'> {data.title} </h1>
                    <h1 className='text-gray-400 font-semibold'> By: {data.author} </h1>
                    <p className='text-xl text-yellow-100 text-right'> $ {data.price} </p>
                </div>
            </Link>
        </div>
    )
}

export default BookCards