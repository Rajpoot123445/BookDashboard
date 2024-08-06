import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCards from './BookCards';
import Loader from './Loader';

const RecentCard = () => {
    const [Data, setData] = useState();
    useEffect(() => {
      const fetch =  async ()=>{
        const res = await axios.get(
            "http://localhost:1000/test/get-recent-books",
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW0iOlt7Im5hbWUiOiJSYW5hQXdhaXMifSx7InJvbGUiOiJ1c2VyIn1dLCJpYXQiOjE3MjI0MTA3OTYsImV4cCI6MTcyNTAwMjc5Nn0.X-ZyF9SVVL62pTPRIS4GScGGzMlaJMwKZmv_Lii4fas`
                  }
            }
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

export default RecentCard