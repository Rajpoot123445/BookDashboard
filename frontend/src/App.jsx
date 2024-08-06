import { useState } from 'react'
import './App.css';
import Home from './pages/home';
import Books from './pages/Books';
import AboutUs from './pages/AboutUs';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';



import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes, useLocation } from 'react-router-dom';
import DetailedBook from './components/DetailedBook';
import { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)
  const loc = useLocation();

  const showNavbar = !(loc.pathname.includes('login') || loc.pathname.includes("/signup"));

  return (
    <>
      {showNavbar && <Navbar />}
      
      <div className={`${showNavbar? "mt-12 px-4 py-8 bg-slate-700":""}`}>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-books' element={ <Books /> } />
        <Route path='/all-books/:id' element={ <DetailedBook /> } />
        <Route path='/about-us' element={<AboutUs />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      </div>
      {showNavbar && <Footer /> }
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
