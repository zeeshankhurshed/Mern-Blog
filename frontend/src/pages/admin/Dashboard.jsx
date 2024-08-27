import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import { FaBlog } from 'react-icons/fa';
import { RiAdminLine } from "react-icons/ri";
import { FaRegComments } from "react-icons/fa";
import { useFetchBlogQuery } from '../../redux/features/blog/blogApi';
import { useGetCommentsQuery } from '../../redux/features/comment/commentApi';
import { useGetUsersQuery } from '../../redux/features/auth/authApi';
import BlogChart from './BlogChart';

const Dashboard = () => {
  const [query, setQuery] = useState({ search: '', category: '' });
  const { user } = useSelector((state) => state.auth);

  const { data: blogs = [], error, isLoading } = useFetchBlogQuery(query);
  const { data: comments = {} } = useGetCommentsQuery();
  const { data: usersData = {} } = useGetUsersQuery();

  // Accessing the `existingUser` array safely
  const users = usersData.existingUser || [];
  
  // Counting the number of admins
  const adminCounts = users.filter(user => user.role === 'admin').length;

  return (
    <>
      {isLoading && (<div>Loading...</div>)}

      <div className='space-y-6'>
        <div className='bg-bgPrimary p-5'>
          <h2>Hi, <span className='font-extrabold uppercase underline leading-8 text-xl'>{user?.username}</span></h2>
          <p>Welcome to the Admin Dashboard</p>
          <p>Here you can manage hotel's posts, manage rooms, and other administrative tasks.</p>
        </div>

        {/* Cards grid */}
        <div className='flex flex-col md:flex-row justify-between gap-8 pt-8'>
          <div className='bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
            <FiUsers className='size-8 text-indigo-600' />
            <p>{users.length} Users</p>
          </div>

          <div className='bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
            <FaBlog className='size-8 text-red-600' />
            <p>{blogs.length} Blogs</p>
          </div>

          <div className='bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
            <RiAdminLine className='size-8 text-lime-600' />
            <p>{adminCounts} Admin{adminCounts !== 1 ? 's' : ''}</p>
          </div>

          <div className='bg-orange-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
            <FaRegComments className='size-8 text-orange-600' />
            <p>{comments.totalComment || 0} Comments</p>
          </div>
        </div>
        {/* graphs and charts */}
        <div className='py-5 '>
          <BlogChart blogs={blogs}/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
