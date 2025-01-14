import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import BookCards from '../components/BookCards';

const Books = () => {
  const [Data, setData] = useState();
  
    useEffect(() => {
      const fetch =  async ()=>{
        const res = await axios.get(
            "http://localhost:1000/test/get-books"
        );
        setData(res.data.data);
      }
      fetch();
    }, []);
  return (
    <div className='flex flex-col px-6 py-6 gap-5'>
        <h1 className='text-4xl font-semiboldd text-yellow-100 text-center underline'>All Books</h1>
        <div className='flex justify-center items-center'>
        {!Data && <Loader />}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {
                Data && Data.map((item,i)=>(
                    <div key={i}>
                        <BookCards data={item} /> {" "}
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Books