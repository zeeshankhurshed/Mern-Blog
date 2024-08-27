import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/auth/authSlice';

const AdminNavigation = () => {
  const [LogoutUser]=useLogoutUserMutation();
const dispatch=useDispatch();

const handleLogout=async()=>{
  try {
    await LogoutUser().unwrap();
    dispatch(logout());
  } catch (error) {
    console.error('Fail to logout',error)
  }
}

  return (
    <div className='flex flex-col justify-between h-full'>
      {/* Upper part: Admin info and navigation links */}
      <div>
        <div className='flex items-center gap-2 p-4'>
          <img src="/admin.png" alt="Admin" className='h-14' />
          <span className='font-semibold text-lg'>Admin</span>
        </div>
        <hr className='my-3' />
        <ul className='flex flex-col gap-4 p-4'>
          <li>
            <NavLink to={'/dashboard'} 
            end
            className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/add-new-post'} className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>
              Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/manage-items'} className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>
              Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/users'} className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"}>
              Users
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Bottom part: Logout button */}
      <div className='p-4'>
        <hr className='my-3' />
        <button onClick={handleLogout} className='text-white bg-red-500 font-medium px-5 py-2 rounded-lg w-full'>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminNavigation;
