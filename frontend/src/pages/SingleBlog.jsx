import React from 'react';
import { useFetchBlogByIdQuery } from '../redux/features/blog/blogApi';
import { useParams } from 'react-router-dom';
import SingleBlogCard from '../components/SingleBlogCard';
import Coment from '../components/Coment';
import RelatedBlogs from '../components/RelatedBlogs';

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);
  
  return (
    <div className='text-primary container mx-auto mt-8'>
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong...</div>}
        {blog?.post && (
          <div className='flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8'>
            <div className='lg:w-2/3 w-full'>
              <SingleBlogCard blog={blog.post} />
              <Coment comments={blog.comments} />
            </div>
            <div className='bg-white lg:w-1/3 w-full'>
              <RelatedBlogs />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
