import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
const Banner = () => {

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    }
  };
  return (
    <div className='w-full pt-38 bg-[#f3f6fa]'>
      <div className='w-[90%] lg:w-[85%] mx-auto py-8'>
        <div className='w-full flex flex-col lg:flex-row gap-6'>

          {/* Main Carousel Section */}
          <div className='w-full lg:w-8/12'>
            <div className='rounded-lg shadow-lg overflow-hidden'>
              <Carousel
                responsive={responsive}
                autoPlay={true}
                showDots={true}
                infinite={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {
                  [1, 2, 3, 4].map((img, i) => (
                    <Link key={i} to='#'>
                      <img
                        className='w-full h-[380px] md:h-[450px] lg:h-[490px] object-cover'
                        src={`/images/banner/banner${img}.png`}
                        alt={`Banner ${img}`}
                      />
                    </Link>
                  ))
                }
              </Carousel>
            </div>
          </div>

          {/* Side Banners Section (visible on large screens) */}
          <div className='w-full lg:w-4/12 flex flex-col gap-6'>
            <Link to='#' className='block rounded-lg shadow-md overflow-hidden'>
              <img
                className='w-full h-[230px] object-cover'
                src="/images/banner/banner5.png"
                alt="Side Banner 1"
              />
            </Link>
            <Link to='#' className='block rounded-lg shadow-md overflow-hidden'>
              <img
                className='w-full h-[230px] object-cover'
                src="/images/banner/banner6.png"
                alt="Side Banner 2"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;