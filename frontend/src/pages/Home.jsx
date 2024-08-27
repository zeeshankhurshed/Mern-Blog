import React from 'react'
import Hero from '../components/Hero'
import Blog from './Blog'

const Home = () => {
  return (
    <div className='bg-white text-primary container mx-auto mt-8 p-8'>
      <Hero />
      <Blog />
    </div>
  )
}

export default Home
