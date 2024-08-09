import React, { useEffect, useState } from 'react'
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ detail }) => {
    const navigate = useNavigate(); 

    const clearall = () => {
        localStorage.clear();
        reload();
    };

    return (
        <div className='bg-slate-900 py-4 h-[88vh] rounded-md flex flex-col justify-between'>
            <div className='flex flex-col items-center gap-2'>
                <img src={detail.avatar} alt="Role" className='w-1/2' />
                <h1 className='font-semibold text-xl text-yellow-200'> {detail.username} </h1>
                <h1> {detail.email} </h1>
            </div>
            <div className='w-full flex flex-col items-center gap-2'>
                <Link to='/profile' className=' hover:bg-slate-700 w-[95%] font-semibold text-center p-3 rounded-md ' >
                    Favourites
                </Link>
                <Link to='/profile/orderHistory' className=' hover:bg-slate-700 w-[95%] font-semibold text-center p-3 rounded-md ' >
                    Order History
                </Link>
                <Link to='/profile/settings' className=' hover:bg-slate-700 w-[95%] font-semibold text-center p-3 rounded-md ' >
                    Settings
                </Link>
            </div>
            <div className='w-full flex flex-col items-center'>
                <Link to="/" onClick={clearall} className=' flex justify-center items-center bg-slate-700 hover:bg-white hover:text-black font-semibold gap-1 w-[95%] p-3 rounded-md    '>
                    <MdLogout />
                    Logout
                </Link>
            </div>
        </div>
    )
}

export default Sidebar