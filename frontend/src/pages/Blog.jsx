import React, { useState } from 'react';
import SearchBlog from '../components/SearchBlog';
import { useFetchBlogQuery } from '../redux/features/blog/blogApi';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({ search: '', category: '' });

  // Get data using Redux
  const { data: blogsData = {}, error, isLoading } = useFetchBlogQuery(query);
  const blogs = blogsData || []; // Adjust based on your API structure
  // console.log(blogs);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => setQuery({ search, category });

  return (
    <div className='mt-16 container mx-auto'>
      <SearchBlog 
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      {isLoading && <div>Loading....</div>}
      {error && <div>{error.toString()}</div>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link 
              key={blog._id} 
              to={`/blog/${blog._id}`} 
              className='block rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300'
            >
              <img src={blog.coverImage} alt={blog.title} className='w-full h-48 object-cover' />
              <div className='p-4'>
                <h2 className='text-xl font-bold mb-2'>{blog.title}</h2>
                <p className='text-gray-600 mb-2'>{blog.description}</p>
                <p className='text-sm text-gray-500'>Category: {blog.category}</p>
                <p className='text-sm text-gray-500'>Location: {blog.location}</p>
                <p className='text-sm text-gray-500'>Rating: {blog.rating}</p>
                <p className='text-sm text-gray-500'>Author: {blog.author?.email}</p>
                <p className='text-sm text-gray-500'>Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className='text-center text-gray-600'>No blogs found</div>
        )}
      </div>
    </div>
  );
};

export default Blog;