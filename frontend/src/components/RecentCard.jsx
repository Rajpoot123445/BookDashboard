import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCards from './BookCards';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const RecentCard = () => {
    const [Data, setData] = useState();
    const tokenlocal = JSON.parse(localStorage.getItem("Token"));
    // const idlocal = JSON.parse(localStorage.getItem("Users"));
    const headers = {
        'authorization': `Bearer ${tokenlocal}`,
    };
    useEffect(() => {
      const fetch =  async ()=>{
        const res = await axios.get(
            "http://localhost:1000/test/get-recent-books",
            { headers }
        );
        setData(res.data.data);
      }
      fetch();
    }, []);
    
  return (
    <div className='flex flex-col px-6 py-6 gap-5'>
        <h1 className='text-3xl text-yellow-100'>Recently Add Books</h1>
        <div className='flex justify-center items-center'>
        {!Data && <Loader />}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
            {
                Data && Data.map((items,i)=>(
                    <div key={i}>
                      <Link>
                        <BookCards data={items} /> {" "}
                        </Link>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default RecentCard