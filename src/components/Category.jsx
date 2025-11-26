import React from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Category = () => {
  const { categories } = useSelector(state => state.category);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    },
    smmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1
    }
  };
  return (
    <div className='w-[90%] mt-6 mx-auto'>
      <div className='w-full flex justify-center items-center flex-col text-slate-600 pb-5 md:pb-[35px]'>
        <h2 className='text-center text-xl md:text-2xl font-bold'>Danh mục hàng đầu</h2>
        <div className='w-[100px] h-0.5 bg-[#059473] mt-4'></div>
      </div>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        infinite={true}
        transitionDuration={500}
      >
        {
          categories.map((c, i) => <Link to={`/category/${c.slug}`} className='h-[185px] block border border-slate-100' key={i}>
            <div className='w-full h-full relative p-3'>
              <img src={c.image} alt="" />
              <div className='absolute bottom-4 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                <span className='py-0.5 px-6 bg-[#b9b7b7]/80 text-white rounded-md text-sm'>{c.category_name}</span>
              </div>
            </div>
          </Link>)
        }
      </Carousel>
    </div>
  );
};

export default Category;