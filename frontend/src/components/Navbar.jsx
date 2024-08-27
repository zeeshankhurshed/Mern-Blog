import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice'; // Import the logout action

const navList = [
  { name: "Home", path: '/' },
  { name: "About Us", path: '/about' },
  { name: "Contact", path: '/contact' },
  { name: "Privacy Policies", path: '/privacy' },
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to update the state
    // Redirect or additional logic can be added here if needed
  };

  const toggleMenu = () => setShow(!show);

  return (
    <header className='bg-white py-6 border'>
      <nav className='container mx-auto flex justify-between px-5 items-center'>
        <Link to='/'>
          <img src="/logo.png" alt="logo" className='h-8' />
        </Link>
        <ul className='md:flex items-center gap-8 hidden'>
          {navList.map((list, index) => (
            <li key={index}>
              <NavLink to={list.path} className={({ isActive }) => (isActive ? "active" : "")}>
                {list.name}
              </NavLink>
            </li>
          ))}

          {user && (
            <li className='flex items-center gap-3'>
              <img src="/commentor.png" alt="" className='h-8 w-8' />
              {user.role === 'admin' && (
                <Link to='/dashboard'>
                  <button className='bg-[#1e73be] px-4 py-1.5 text-white rounded-lg'>Dashboard</button>
                </Link>
              )}
              <button className='bg-[#1e73be] px-4 py-1.5 text-white rounded-lg' onClick={handleLogout}>Logout</button>
            </li>
          )}

          {!user && (
            <li className='font-semibold' onClick={() => setShow(false)}>
              <NavLink to='/login'>Login</NavLink>
            </li>
          )}
        </ul>

        <div className='flex items-center sm:hidden'>
          <button className='flex items-center px-3 py-4 rounded text-sm text-gray-500 hover:text-gray-900' onClick={toggleMenu}>
            {show ? <IoCloseSharp className='h-6 w-6' /> : <IoIosMenu className='h-6 w-6' />}
          </button>
        </div>
      </nav>

      {show && (
        <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
          {navList.map((list, index) => (
            <li onClick={() => setShow(false)} key={index} className='mt-5 px-4 font-semibold'>
              <NavLink to={list.path} className={({ isActive }) => (isActive ? "active" : "")}>
                {list.name}
              </NavLink>
            </li>
          ))}

          {user && (
            <li className='flex items-center gap-3'>
              <img src="/commentor.png" alt="" className='h-8 w-8' />
              {user.role === 'admin' && (
                <Link to='/dashboard'>
                  <button className='bg-[#1e73be] px-4 py-1.5 text-white rounded-lg'>Dashboard</button>
                </Link>
              )}
              <button className='bg-[#1e73be] px-4 py-1.5 text-white rounded-lg' onClick={handleLogout}>Logout</button>
            </li>
          )}

          {!user && (
            <li className='font-semibold' onClick={() => setShow(false)}>
              <NavLink to='/login'>Login</NavLink>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
