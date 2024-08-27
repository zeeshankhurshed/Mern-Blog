import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import List from '@editorjs/list';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import {  usePostBlogMutation } from '../../redux/features/blog/blogApi';
import {useNavigate} from 'react-router-dom';

const AddNewPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.auth);
  // const [createPost] = useCreatePostMutation();
  const [postBlog,{isLoading}]=usePostBlogMutation()
const navigate=useNavigate()
  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
        console.log('EditorJS initialized');
      },
      autofocus: true,
      tools: {
        header: Header,
        list: List,
        paragraph: Paragraph,
      },
    });

    return () => {
      if (editorRef.current) {
        console.log('Destroying EditorJS instance');
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editorRef.current) {
        try {
            const outputData = await editorRef.current.save();
            console.log('EditorJS Output Data:', outputData); // Debug output data

            const newPostData = {
                title,
                content: JSON.stringify(outputData), // Store the entire output data
                coverImage: coverImage,
                metaDescription,
                category,
                rating,
                author: user._id,
            };

            const response = await postBlog(newPostData).unwrap();
            console.log('Post created:', response);
            setMessage('Post created successfully!');
            alert('Blog is posted successfully');
            navigate('/dashboard');
        } catch (err) {
            console.error('Failed to create post:', err);
            setMessage('Failed to create post');
        }
    }
};
  return (
    <div className='bg-white md:p-8 p-2'>
      <h2 className='text-2xl font-semibold'>Create A New Blog Post</h2>
      <form onSubmit={handleSubmit} className='space-y-5 pt-8'>
        <div className='space-y-4'>
          <label className='font-semibold text-xl'>Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Ex: Marina del Rey Marriott...'
            required
            className='w-full inline-block bg-bgPrimary focus:outline-none p-2 rounded-lg'
          />
        </div>

        {/* blog details */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
          {/* left side */}
          <div className='md:w-2/3 w-full'>
            <h2 className='font-semibold text-xl mb-5'>Content Section</h2>
            <p className='text-xs italic'>Write your post below here...</p>
            <div id='editorjs'></div>
          </div>

          {/* right side */}
          <div className='md:w-1/3 w-full border p-5 space-y-5'>
            <h2 className='text-xl font-semibold'>Choose Blog format</h2>
            {/* images */}
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-sm'>Blog Cover:</label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder='https://unsplash.com/images...'
                required
                className='w-full inline-block bg-bgPrimary focus:outline-none p-2 rounded-lg'
              />
            </div>
            {/* category */}
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-sm'>Category:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder='RoofTop/Travel/Nature...'
                required
                className='w-full inline-block bg-bgPrimary focus:outline-none p-2 rounded-lg'
              />
            </div>

            {/* meta description */}
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-sm'>Meta Description:</label>
              <textarea
                type="text"
                cols={4}
                rows={4}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder='Write your meta description...'
                required
                className='w-full inline-block bg-bgPrimary focus:outline-none p-2 rounded-lg'
              />
            </div>

            {/* rating */}
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-sm'>Rating:</label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder=''
                required
                className='w-full inline-block bg-bgPrimary focus:outline-none p-2 rounded-lg'
              />
            </div>

            {/* author */}
            <div className='flex flex-col gap-2'>
              <label className='font-semibold text-sm'>Author:</label>
              <input
                type="text"
                value={user.username}
                disabled
                placeholder={`${user.username} (not editable)`}
                className='w-full inline-block bg-bgPrimary focus:outline-none p-2 rounded-lg'
              />
            </div>
          </div>
        </div>
        <button type='submit' disabled={isLoading} className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white p-3 rounded-lg uppercase font-bold'>Add New Blog</button>
      </form>
      {
        message && <p className='text-red-500'>{message}</p>
      }
    </div>
  );
}

export default AddNewPost;