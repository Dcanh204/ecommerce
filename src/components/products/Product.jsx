import React from 'react';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
const Product = ({ title }) => {
  const products = [
    [1, 2, 3],
    [4, 5, 6]
  ]
  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1
    }
  };

  const ButtonGroup = ({ previous, next }) => {
    return (
      <div className='flex justify-between items-center'>
        <div className='text-xl font-bold text-slate-600'>
          {
            title
          }
        </div>
        <div className='flex justify-center items-center gap-3 text-slate-600'>
          <button onClick={() => previous()} className='w-[35px] h-[35px] flex items-center justify-center border border-slate-200 bg-slate-300 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'>
            <IoIosArrowBack />
          </button>
          <button onClick={() => next()} className='w-[35px] h-[35px] flex items-center justify-center border border-slate-200 bg-slate-300 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'>
            <IoIosArrowForward />
          </button>
        </div>

      </div>
    )
  }


  return (
    <div className='flex flex-col-reverse gap-8'>
      <Carousel
        responsive={responsive}
        autoPlay={false}
        infinite={false}
        arrows={false}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {
          products.map((item, index) => {
            return (
              <div key={index} className='flex flex-col justify-start gap-8'>
                {
                  item.map((p, i) => <Link className='flex justify-start items-start gap-3' to='#' key={i}>
                    <img className='w-[130px] h-[130px]' src={`/images/products/${p}.webp`} alt="" />
                    <div className='flex flex-col justify-start items-start gap-1'>
                      <h3 className='text-base md:text-[18px] font-medium line-clamp-2'>OPPO Reno14 F 5G 12GB/256GB</h3>
                      <p className="text-red-500 font-bold text-lg">
                        8.130.000₫
                      </p>
                      <div>
                        <span className='text-gray-400 line-through text-base'>8.830.000₫</span>
                        <span className='text-red-500 font-medium text-base'> -11%</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <FaStar className='text-sm text-yellow-400' />
                        <span className="text-sm font-semibold text-gray-700">4.9</span>
                        <span className="text-xs text-gray-500">· Đã bán 11,7k</span>
                      </div>
                    </div>
                  </Link>)
                }
              </div>
            )

          })
        }
      </Carousel>
    </div>
  );
};

export default Product;