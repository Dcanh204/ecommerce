import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
const Banner = () => {

  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1
    }
  };
  return (
    <div className='w-full pt-28 lg:pt-33'>
      <div className='w-[90%] lg:w-[90%] mx-auto'>
        <div className='w-full flex flex-wrap gap-8 lg:gap-0'>
          <div className='w-full'>
            <div className='my-8'>
              <Carousel
                responsive={responsive}
                autoPlay={true}
                showDots={true}
                infinite={true}
                autoPlaySpeed={2500}

              >
                {
                  [1, 2, 3, 4, 5, 6].map((img, i) => <Link key={i} to='#'>
                    <img src={`/images/banner/${img}.jpg`} alt="" />
                  </Link>)
                }
              </Carousel>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;