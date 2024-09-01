import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [Total, setTotal] = useState(0);
  const tokenlocal = JSON.parse(localStorage.getItem("Token"));
  const idlocal = JSON.parse(localStorage.getItem("Users"));
  const headers = {
    'authorization': `Bearer ${tokenlocal}`,
    'id': idlocal,
  };

  useEffect(() => {
    const roles = async () => {
      try {
        const res = await axios.get("http://localhost:1000/add/get-cart", { headers });
        let total = 0;
        res.data.data.forEach((items) => {
          total += items.price;
        })
        setTotal(total);
        setData(res.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    roles();
  }, [Data]);


  const deleteItemz = async (bookid) => {
    const res = await axios.put(`http://localhost:1000/add/remove-cart-id/${bookid}`, {}, { headers });
    alert(res.data);
  };

  const PlaceOrder = async () => {
    try {
      const res = await axios.post('http://localhost:1000/add/place-order', { order: Data }, { headers });
      alert(res.data.message);
      navigate('/profile/orderHistory');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='h-auto'>
      <h1 className='px-8 py-4 text-4xl text-yellow-100 font-semibold'>Cart Books</h1>
      {
        Data.length === 0 &&
        <div className='flex justify-center items-center h-[90vh] text-9xl font-semibold text-gray-200 '>
          <p>Empty Cart</p>
          <svg class="w-6 h-6 text-red-600 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor">
            <path d="M11 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
            <path fill-rule="evenodd" d="M9.896 3.051a2.681 2.681 0 0 1 4.208 0c.147.186.38.282.615.255a2.681 2.681 0 0 1 2.976 2.975.681.681 0 0 0 .254.615 2.681 2.681 0 0 1 0 4.208.682.682 0 0 0-.254.615 2.681 2.681 0 0 1-2.976 2.976.681.681 0 0 0-.615.254 2.682 2.682 0 0 1-4.208 0 .681.681 0 0 0-.614-.255 2.681 2.681 0 0 1-2.976-2.975.681.681 0 0 0-.255-.615 2.681 2.681 0 0 1 0-4.208.681.681 0 0 0 .255-.615 2.681 2.681 0 0 1 2.976-2.975.681.681 0 0 0 .614-.255ZM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" clip-rule="evenodd" />
            <path d="M5.395 15.055 4.07 19a1 1 0 0 0 1.264 1.267l1.95-.65 1.144 1.707A1 1 0 0 0 10.2 21.1l1.12-3.18a4.641 4.641 0 0 1-2.515-1.208 4.667 4.667 0 0 1-3.411-1.656Zm7.269 2.867 1.12 3.177a1 1 0 0 0 1.773.224l1.144-1.707 1.95.65A1 1 0 0 0 19.915 19l-1.32-3.93a4.667 4.667 0 0 1-3.4 1.642 4.643 4.643 0 0 1-2.53 1.21Z" />
          </svg>

        </div>
      }

      <div className='flex flex-col gap-5 px-10'>
        {
          Data && Data.map((items, i) => (
            <div key={i} className=''>
              <div className='flex justify-between items-center bg-slate-500 px-12 py-4 rounded-md shadow-md hover:scale-105 transition-all duration-500'>
                <div className='flex items-center gap-24'>

                  <img src={items.url} alt="Image" className='w-32 h-24' />
                  <div>
                    <h1 className='text-yellow-100 text-3xl'> {items.title} </h1>
                    <p className='text-gray-300 text-lg'> {items.desc.slice(0, 100)}... </p>
                  </div>
                </div>
                <div className='flex justify-center items-center gap-6'>
                  <h2 className='text-2xl font-semibold'> $ {items.price} </h2>
                  <button className='text-3xl text-red-500 p-2 bg-red-200 hover:scale-105 rounded-md' onClick={() => deleteItemz(items._id)}><MdDelete /></button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='flex justify-end pr-10'>
        <div className='flex flex-col justify-center gap-2 rounded-md shadow-lg mt-3 p-4 text-yellow-100 w-56 bg-slate-500'>
          <h1 className='text-2xl font-semibold text-center'>Total Amount</h1>
          <div className='flex justify-between text-xl font-medium'>
            <p>{Data.length} Books</p>
            <p> $ {Total} </p>
          </div>
          <button className='bg-white text-black font-medium py-1 rounded-md' onClick={PlaceOrder}>
            Place your order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart