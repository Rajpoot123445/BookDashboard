import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { MdFavorite } from 'react-icons/md';
import { IoMdCart } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const DetailedBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [Data, setData] = useState();
    const [rolz, setRolz] = useState();
    const [showCart, setShowCart] = useState(false);
    const tokenlocal = JSON.parse(localStorage.getItem("Token"));
    const idlocal = JSON.parse(localStorage.getItem("Users"));
    const headers = {
        'authorization': `Bearer ${tokenlocal}`,
        'id': idlocal,
        'bookid': id
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(
                `http://localhost:1000/test/get-by-id/${id}`, { headers }
            );

            setData(res.data.data);
        }
        fetch();
        const userData = localStorage.getItem('Users');
        setShowCart(!!userData);
    }, []);

    useEffect(() => {
        const roles = async () => {
          try {
            const res = await axios.get("http://localhost:1000/api/get-data", { headers });
            setRolz(res.data.role);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        roles();
      }, []);

    const handleFavourite = async ()=>{
        const res = await axios.put("http://localhost:1000/add/add-favourite", {},{ headers });
        alert(res.data);
    };

    const handleCart = async () => {
        try {
            const res = await axios.put("http://localhost:1000/add/add-cart", {}, { headers });
            alert(res.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async ()=>{
        try {
            const res = await axios.delete("http://localhost:1000/test/delete-books", { headers });
            alert(res.data.message);
            navigate('/all-books');
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    return (
        <>
            <div>
                {
                    Data && (
                        <div className='flex p-8 gap-6'>
                            <div className='w-full md:w-1/2 mt-6 bg-slate-800 px-8 py-8 h-[65vh] flex justify-around gap-4'>
                                <div className='h-full'>
                                    <img src={Data.url} alt="Img" className='h-[100%]' />
                                </div>
                                {
                                    showCart ? 
                                    rolz == "user" ? 
                                    <div className='flex flex-col gap-6'>
                                        <button className='bg-white rounded-full p-2 text-3xl text-red-500' onClick={handleFavourite}> <MdFavorite /> </button>
                                        <button className='bg-white rounded-full p-2 text-3xl text-blue-500' onClick={handleCart}> <IoMdCart /> </button>
                                    </div> 
                                    :
                                    <div className='flex flex-col gap-6'>
                                        <Link to={`/update-book/${id}`} className='bg-white rounded-full p-2 text-3xl text-blue-500'> <FaEdit /> </Link>
                                        <button className='bg-white rounded-full p-2 text-3xl text-red-500' onClick={handleDelete}> <MdDelete /> </button>
                                    </div> 
                                    : 
                                    " "
                                }
                            </div>
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