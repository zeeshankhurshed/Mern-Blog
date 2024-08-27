import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePostCommentMutation } from '../redux/features/comment/commentApi';
import{useFetchBlogByIdQuery} from '../redux/features/blog/blogApi';

const PostComent = () => {
  const { id } = useParams();
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [postComment] = usePostCommentMutation();
const {refetch}=useFetchBlogByIdQuery(id, {skip:!id})
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment on this post.');
      navigate('/login');
      return;
    }
    const newComment = {
      comment: comment, // Ensure the field name matches the schema
      user: user?._id,
      postId: id
    };
    // console.log(newComment);
    
    try {
      const response = await postComment(newComment).unwrap();
      // console.log(response);
      alert('Commnet posted Successfully');
      setComment('');
      refetch();
    } catch (error) {
      alert('An error occurred while posting the comment');
    }
  };

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-medium mb-8'>Leave a Comment</h3>
      <form onSubmit={handleSubmit}> {/* Change from onClick to onSubmit */}
        <textarea
          name="text"
          value={comment} // Correct the field name here
          onChange={(e) => setComment(e.target.value)}
          cols={30}
          rows={10}
          placeholder='Share your opinion about these posts....'
          className='w-full bg-bgPrimary focus:outline-none p-5'
        />
        <button
          type='submit'
          className='w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostComent;
