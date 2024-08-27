import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useSelector} from 'react-redux';
import AdminNavigation from './AdminNavigation';
// import AdminNavigation from '../AdminNavigation';

const AdminLayout = () => {
    const {user}=useSelector((state)=>state.auth);
    if(!user || user.role !== 'admin'){
        return <Navigate to='/login'/>
    }
  return (
    <div className='flex flex-col md:flex-row items-start '>
      {/* Sidebar for navigation */}
      <nav className='w-full md:w-1/4 lg:w-1/5 bg-gray-100 p-4 h-screen'>
        <h2 className='text-xl font-bold mb-4'>Admin Navigation</h2>
      <AdminNavigation/>
      </nav>

      {/* Main content area */}
      <main className='w-full md:w-3/4 lg:w-4/5 p-8 bg-white shadow-md'>
        {/* <p className='text-lg font-medium mb-4'>Admin Content</p> */}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
