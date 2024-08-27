import React from 'react';
import PostComent from './PostComent';
import { useSelector } from 'react-redux';

const Coment = ({ comments }) => {
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const { user } = useSelector((state) => state.auth);

  return (
    <div className='container mx-auto my-6 px-8 bg-white'>
      <div>
        {comments?.length > 0 ? (
          <div>
            <h3 className='text-lg font-medium'>All Comments</h3>
            <div>
              {comments.map((comment, index) => (
                <div key={comment._id} className='border-b py-4'>
                  <div className='flex items-center gap-4'>
                    <img src='/commentor.png' alt="Commentor" className='h-14' />
                    <div>
                      <p className='text-lg font-medium'>{comment.comment}</p>
                      <p className='text-md font-medium underline capitalize text-blue-400'>
                        {user && user._id === comment.user ? user.username : 'Anonymous'}
                      </p>
                      <p className='text-sm italic'>{formatDate(comment.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='text-lg font-medium'>No comments found!</div>
        )}
      </div>
      <PostComent />
    </div>
  );
};

export default Coment;
