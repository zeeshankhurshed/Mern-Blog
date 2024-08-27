import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchRelatedBlogsQuery } from '../redux/features/blog/blogApi';
// import { useSelector } from 'react-redux';

const RelatedBlogs = () => {
  const { id } = useParams();
  const { data: blog = {}, error, isLoading } = useFetchRelatedBlogsQuery(id);

  // Accessing the relatedPost array from the data object
  const relatedPosts = blog.relatedPost || [];

  // const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h3 className='text-2xl font-medium pt-8 px-8 pb-5'>Related Blogs</h3>
      <hr />
      {isLoading ? (
        <div className='p-8'>Loading...</div>
      ) : error ? (
        <div className='p-8'>Error fetching related blogs!</div>
      ) : relatedPosts.length === 0 ? (
        <div className='p-8'>No related blogs found!</div>
      ) : (
        <div className='space-y-4 mt-5'>
          {relatedPosts.map((blog) => {
            // Ensure blog.title and blog.description are strings before using substring
            const title = typeof blog.title === 'string' ? blog.title.substring(0, 50) : 'No Title';
            const description = typeof blog.description === 'string' ? blog.description.substring(0, 50) : 'No Description';

            return (
              <Link to={`/blog/${blog._id}`} key={blog._id}>
                <div className='flex items-center px-8 py-4 gap-4 shadow-sm'>
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className='w-12 h-12 rounded-full ring-2 ring-blue-700'
                  />
                  <div>
                    <h4 className='text-[#1e73be] font-medium w-3/4'>{title}...</h4>
                    <p className='text-xs text-gray-500'>{description}...</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RelatedBlogs;
