import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";

const DetailedBook = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(
                `http://localhost:1000/test/get-by-id/${id}`,
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
    console.log(id);
    return (
        <>
            <div>
                {
                    Data && (
                        <div className='flex p-8 gap-6'>
                            <div className='w-full md:w-1/2 mt-6 bg-slate-800 px-6 h-[70vh] flex justify-center'> <img src={Data.url} alt="Img" className='w-[100%]' /> </div>
                            <div className='w-full md:w-1/2 flex  flex-col gap-2 px-4 py-1 text-gray-400'>
                                <h1 className='text-4xl text-yellow-100'> {Data.title} </h1>
                                <h2 className='text-lg'> by {Data.author} </h2>
                                <p className='text-lg'> {Data.desc} </p>
                                <h3 className="flex items-center gap-2 text-lg"> <GrLanguage /> {Data.language} </h3>
                                <h1 className='text-3xl text-gray-200'> $ {Data.price} </h1>
                            </div>
                        </div>
                    )
                }
            </div>
            <div >
                {!Data && <div className='flex justify-center items-center'><Loader /></div>}
            </div>
        </>
    )
}

export default DetailedBook