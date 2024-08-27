import React from 'react'
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
const Layout = () => {
  return (
    <div className='bg-bgPrimary min-h-screen flex flex-col'>
     <Navbar/> 
     <div className='flex-grow'>
     <Outlet/>
     </div>
     <div className='mt-auto'>
     <Footer />
     </div>
    </div>
  )
}

export default Layout
