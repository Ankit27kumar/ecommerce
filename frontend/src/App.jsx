import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';
import Footer from './Footer';
import Adsignin from './admin/login/Adsignin';
import Adsignup from './admin/login/Adsignup';
import Profile from './Profile';
import Shop from './Shop';
import Product from './admin/products/Product';



function App() {
 

  return (
    <>
    
     <Router>
     <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/user-login" element={<Signin />} />
          <Route path="/usersignup" element={<Signup />} />         
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop" element={<Shop />} />

          {/* admin  routes */}
          <Route path="/admin-login" element={<Adsignin />} />
          <Route path="/adminsignup" element={<Adsignup />} />
          <Route path="/product" element={<Product />} />




         
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
