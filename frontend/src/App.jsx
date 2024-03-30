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


function App() {
 

  return (
    <>
    
     <Router>
     <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
         
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
