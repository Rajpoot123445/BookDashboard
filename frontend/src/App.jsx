import { useEffect, useState } from 'react';
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
import Favourite from './components/Profile/Favourite';
import OrderHistory from './components/Profile/OrderHistory';
import SettingComponent from './components/Profile/Setting'; // Renamed the import to avoid confusion
import AllOrders from './components/Profile/AllOrders';
import AddBook from './components/Profile/AddBook';
import axios from 'axios';
import UpdateBook from './components/UpdateBook';

function App() {
  const [settings, setSettings] = useState(""); // Renamed the state variable

  
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
        setSettings(res.data); 
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);
  const loc = useLocation();

  const showNavbar = !(loc.pathname.includes('login') || loc.pathname.includes("/signup"));

  return (
    <>
      {showNavbar && <Navbar />}
      
      <div className={`${showNavbar ? "mt-12 px-4 py-8 bg-slate-700" : ""}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/all-books' element={ <Books /> } />
          <Route path='/all-books/:id' element={ <DetailedBook /> } />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} >
            {
              settings?.role === "user" ? <>
                <Route index element={ <Favourite /> } />
                <Route path='/profile/orderHistory' element={ <OrderHistory /> } />
                <Route path='/profile/settings' element={ <SettingComponent /> } /> {/* Use the renamed component */}
              </> 
              : 
              <>
                <Route index element={ <AllOrders /> } />
                <Route path='/profile/addBook' element={ <AddBook /> } />
              </>
            }  
          </Route>
          <Route path='/update-book/:id' element={ <UpdateBook /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
      
      {showNavbar && <Footer />}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
