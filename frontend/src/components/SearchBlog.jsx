import React from 'react'

const SearchBlog = ({search,handleSearchChange,handleSearch}) => {
    const handleKeyPress=(event)=>{
        if(event.key=== 'Enter'){
            handleSearch()
        }
    }
  return (
    <div className='w-full flex'>
      <input 
      type="text"
      value={search}
      onChange={handleSearchChange}
      onKeyPress={handleKeyPress}
       placeholder='Hotels with Rooftop Pool Near...' className='py-2 px-4  w-full b-[#f7f8f9] focus:outline-none focus:border rounded-lg' />
      <button className='bg-[#1e73be] px-4 py-2 text-white rounded-lg' onClick={handleSearch}>Search</button>
    </div>
  )
}

export default SearchBlog
