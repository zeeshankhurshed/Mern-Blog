import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Img1 from '../assets/hero-carousel/img1.jpg'
import Img2 from '../assets/hero-carousel/img2.jpg'
import Img3 from '../assets/hero-carousel/img3.jpg'
import Img4 from '../assets/hero-carousel/img4.jpg'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8'>
      <div className='md:w-1/2 w-full text-center'>
        <h2 className='text-3xl font-bold md:text-[40px] md:leading-tight '>Hotels With Rooftop Pools Near Me</h2>
        <p className='py-4 text-gray-400 text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit excepturi quia voluptatum natus temporibus accusantium cumque! Voluptate, perferendis eveniet tenetur eos, autem illum magnam maiores maxime, soluta illo error impedit.</p>
      </div>
      <div className='md:w-1/2 w-full mx-auto '>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src={Img1} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' />
        </SwiperSlide>
        <SwiperSlide><img src={Img2} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' /></SwiperSlide>
        <SwiperSlide><img src={Img3} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' /></SwiperSlide>
        <SwiperSlide><img src={Img4} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' /></SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
export default Hero
