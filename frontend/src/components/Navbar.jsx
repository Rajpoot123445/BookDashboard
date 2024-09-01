import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/logo.png';
import { FaGripLines } from "react-icons/fa6";
import axios from 'axios';

const Navbar = () => {
  const [MobileNav, setMobileNav] = useState("hidden");
  const [showCart, setShowCart] = useState(false);
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

  useEffect(() => {
    const userData = localStorage.getItem('Users');
    setShowCart(!!userData);
  }, []);

  useEffect(() => {
    if (MobileNav === "block") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [MobileNav]);

  const links = [
    {
      title: "Home",
      link: "/",
    },
    ...(Data?.role==="admin" ? [] : [
    {
      title: "About Us",
      link: "/about-us",
    },
  ]),
    {
      title: "All Books",
      link: "/all-books",
    },
    ...(Data?.role==="user" ? [{ title: "Cart", link: "/cart" }] : []),
    ...(Data?.role==="user" ? [{ title: "Profile", link: "/profile" }] : Data?.role==="admin" ? [{ title: "Admin Panel", link: "/profile" }] : []),
  ];

  return (
    <>
      <nav className='fixed top-0 flex w-full justify-between z-50 text-white px-8 py-3 items-center bg-slate-800'>
        <div className='flex justify-center items-center'>
          <img src={image} alt="logo" width="40px" />
          <h1 className='text-2xl ml-2 p-0 font-bold'>AS-Book</h1>
        </div>
        <div className='hidden md:flex justify-center items-center gap-4'>
          <div className='text-white flex gap-5'>
            {links.map((item, i) => (
              <Link key={i} to={item.link} className='hover:text-blue-500 cursor-pointer font-semibold transition-all duration-300'>
                {item.title}
              </Link>
            ))}
          </div>
          {showCart ?
            " "
            :
            <div className='space-x-4'>
              <Link to="/login" className='px-4 py-2 outline-none border transition-all duration-300 border-blue-500 hover:bg-blue-500 rounded-md'>
                Login
              </Link>
              <Link to="/signup" className='px-4 py-2 outline-none transition-all duration-300 bg-blue-500 hover:bg-blue-700 rounded-md'>
                SignUp
              </Link>
            </div>}

        </div>
        <button className='block md:hidden' onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}>
          <FaGripLines />
        </button>
      </nav>
      <div className={`${MobileNav} absolute top-0 h-full flex md:hidden flex-col justify-center items-center gap-4 bg-zinc-500 z-40 w-full`}>
        {links.map((item, i) => (
          <Link key={i} to={item.link} className='hover:text-blue-500 cursor-pointer text-lg font-bold transition-all duration-300'>
            {item.title}
          </Link>
        ))}
        {showCart ?
            " "
            :
            <>
        <Link to="/login" className='px-6 py-3 outline-none border transition-all text-white text-lg font-bold duration-300 border-blue-500 hover:bg-blue-500 rounded-md'>
          Login
        </Link>
        <Link to="/signup" className='px-6 py-3 outline-none transition-all text-lg font-bold duration-300 bg-blue-500 hover:bg-blue-700 rounded-md'>
          SignUp
        </Link>
        </>
}
      </div>
    </>
  );
};

export default Navbar;
