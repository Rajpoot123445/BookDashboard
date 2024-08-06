import axios from 'axios';
import React, { useEffect } from 'react'

const Profile = () => {
  const tokenlocal = localStorage.getItem("Token");
const idlocal = localStorage.getItem("Users");

console.log("Token:", tokenlocal);
console.log("ID:", idlocal);


  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/get-data", {
          headers: {
            'authorization': `Bearer ${tokenlocal}`,
            'id': idlocal
          }
        });
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, []);
  

  return (
    <div className='flex min-h-[80vh]'>
      <div className='bg-slate-600 p-6'>
        Scholar
      </div>
      <div></div>
    </div>
  )
}

export default Profile