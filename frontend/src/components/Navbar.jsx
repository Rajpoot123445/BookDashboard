import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/logo.png';
import { FaGripLines } from "react-icons/fa6";

const Navbar = () => {
  const [MobileNav, setMobileNav] = useState("hidden");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('Users');
    setShowCart(!!userData);
  }, []);

  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    ...(showCart ? [{ title: "Cart", link: "/cart" }] : []),
    ...(showCart ? [{ title: "Profile", link: "/profile" }] : []),
  ];

  return (
    <>
      <nav className='fixed top-0 flex w-full justify-between z-50 text-white px-8 py-3 items-center bg-slate-800'>
        <div className='flex justify-center items-center'>
          <img src={image} alt="logo" width="40px" />
          <h1 className='text-2xl ml-2 p-0 font-bold'>BuyBook</h1>
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
      <div className={`${MobileNav} absolute top-0 h-screen flex md:hidden flex-col justify-center items-center gap-4 bg-zinc-500 z-40 w-full`}>
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
