import React from 'react'
import book from '../assets/book.jpg'

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row px-6 py-8 gap-8 '>
        <div className='w-full md:w-1/2 flex order-2 md:order-1 flex-col pr-12 justify-center gap-4 text-white'>
            <h1 className='text-6xl font-bold'>Discover Your Next Great Road</h1>
            <p className='text-gray-300 text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptas sunt, qui, quod perspiciatis, earum beatae reprehenderit cumque incidunt naex</p>
            <div>
                <button className='border rounded-full px-9 py-3 mt-6 font-semibold text-xl'>Discover Books</button>
            </div>
        </div>
        <div className='w-full md:w-1/2 flex order-1 md:order-2 justify-center'>
            <img src={book} alt="Book" width="95%" className='rounded-md shadow-lg' />
        </div>
    </div>
  )
}

export default Hero