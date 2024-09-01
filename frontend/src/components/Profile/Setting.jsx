import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Setting = () => {
  const [Setting, setSetting] = useState(""); // Properly initialize as an empty array

  
  useEffect(() => {
    const tokenlocal = JSON.parse(localStorage.getItem("Token"));
    const idlocal = JSON.parse(localStorage.getItem("Users"));
  
    const headers = {
      'authorization': `Bearer ${tokenlocal}`,
      'id': idlocal,
    };
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/get-data", { headers });
        setSetting(res.data); 
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);
  return (
    <div>
      <table className='mt-6 flex flex-col gap-5 text-xl'>
        <tr>
          <td>UserName: </td>
          <td>{Setting.username}</td>
        </tr>
        <tr cl>
          <td>Email: </td>
          <td>{Setting.email}</td>
        </tr>
        <tr>
          <td>Address: </td>
        </tr>
        <tr className='w-full'>
          <td></td>
          <td className='w-full'>      <textarea rows="5" value={Setting.address} className='text-yellow-100 p-3 text-xl w-full bg-slate-400' />
          </td>

        </tr>
      </table>
    </div>
  )
}

export default Setting
