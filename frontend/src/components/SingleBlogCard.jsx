import React from 'react';
import EditorJsHtml from 'editorjs-html';

const SingleBlogCard = ({ blog }) => {
  const { title, description, content, coverImage, category, rating, author, createdAt } = blog || {};

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Convert EditorJS content to HTML
  const convertToHTML = (editorJsData) => {
    // Initialize EditorJsHtml instance
    const converter = EditorJsHtml();
    // Ensure editorJsData is an array or an object with blocks
    if (editorJsData && (Array.isArray(editorJsData) || typeof editorJsData === 'object')) {
      try {
        return converter.parse(editorJsData);
      } catch (error) {
        console.error('Error converting EditorJS data to HTML:', error);
        return ''; // Return empty string in case of an error
      }
    }
    return ''; // Return empty string if data is not valid
  };

  return (
    <div className='bg-white p-8'>
      <div>
        <h2 className='md:text-4xl text-3xl font-medium mb-4'>{title}</h2>
        <p className='mb-6 text-sm'>
          {formatDate(createdAt)} by{' '}
          <span className='text-blue-400 cursor-pointer'>
            Admin: {author?.username}
          </span>
        </p>
      </div>
      <div>
        <img src={coverImage} alt="cover Image" className='w-full md:h-[520px] bg-cover' />
        {/* Render content as HTML */}
        <div className='mt-4' dangerouslySetInnerHTML={{ __html: convertToHTML(content) }} />
      </div>
      <div>
        <span className='text-lg font-medium'>Rating:</span>
        <span>{rating} (based on 2,370 reviews)</span>
      </div>
    </div>
  );
};

export default SingleBlogCard;
