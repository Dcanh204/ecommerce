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
    <div className='w-[90%] lg:w-[85%] mt-12 mx-auto'>
      {/* Header Section */}
      <div className='w-full flex justify-between'>
        <div className='w-full flex justify-center items-center flex-col text-slate-600 pb-5 md:pb-[45px]'>
          <h2 className='text-center font-bold text-xl md:text-3xl'>Danh mục nổi bật</h2>
          <div className='w-[100px] h-0.5 bg-[#059473] mt-4'></div>
        </div>
      </div>

      <div className='relative'>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          transitionDuration={500}
          arrows={true}
        >
          {
            categories.map((c, i) => (
              <Link to={`/category/${c.slug}`} className='block px-2 group' key={i}>
                <div className='bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#059473]/30 transition-all duration-300 flex flex-col items-center gap-4 group-hover:-translate-y-2'>
                  <div className='w-full aspect-square bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-4 group-hover:bg-white transition-colors duration-300'>
                    <img
                      src={c.image}
                      alt={c.category_name}
                      className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-110'
                    />
                  </div>
                  <div className='text-center w-full'>
                    <span className='font-bold text-slate-700 text-sm md:text-base group-hover:text-[#059473] transition-colors truncate block'>
                      {c.category_name}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          }
        </Carousel>
      </div>
    </div>
  );
};

export default Category;