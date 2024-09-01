import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import Loader from '../components/Loader';

const Profile = () => {
  
  const [Data, setData] = useState("");
  
  useEffect(() => {
    const tokenlocal = JSON.parse(localStorage.getItem("Token"));
    const idlocal = JSON.parse(localStorage.getItem("Users"));
  
    const headers = {
      'authorization': `Bearer ${tokenlocal}`,
      'id': idlocal
    }
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/get-data", { headers });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, []);


  return (
    <>
      <div className='flex flex-col md:flex-row py-6 px-2 md:px-12 gap-4 text-white'>
        {!Data && ( <div className='w-full flex justify-center items-center text-4xl'>
          <Loader />
        </div> )  }
        {Data && (
          <>
            <div className='md:w-1/6 md:h-screen'>
              <Sidebar detail={Data} />
            </div>
            <div className='md:w-5/6'>
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Profile