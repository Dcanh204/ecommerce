import React from 'react';
import { FaStar } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
const Product = ({ title, products }) => {
  const responsive = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1
    }
  };

  const ButtonGroup = ({ previous, next }) => {
    return (
      <div className='flex justify-between items-center'>
        <div className='text-lg font-bold text-slate-600'>
          {
            title
          }
        </div>
        <div className='flex justify-center items-center gap-3 text-slate-600'>
          <button onClick={() => previous()} className='w-[30px] h-[30px] flex items-center justify-center border border-slate-200 bg-slate-300 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'>
            <IoIosArrowBack />
          </button>
          <button onClick={() => next()} className='w-[30px] h-[30px] flex items-center justify-center border border-slate-200 bg-slate-300 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'>
            <IoIosArrowForward />
          </button>
        </div>

      </div>
    )
  }

  const formatPrice = (price) => {
    const rounded = Math.round(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
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
                    <img className='w-[120px] h-[120px]' src={p.images[0]} alt="" />
                    <div className='flex flex-col justify-start items-start gap-1'>
                      <h3 className='text-sm font-medium line-clamp-2'>{p.name}</h3>
                      {
                        p.discount > 0
                          ?
                          <>
                            <p className="text-red-500 font-bold text-base">
                              {formatPrice(p.price - (p.price * p.discount) / 100)}
                            </p>
                            <div>
                              <span className='text-gray-400 line-through text-sm'>{formatPrice(p.price)}</span>
                              <span className='text-red-500 font-medium text-sm'> -{p.discount}%</span>
                            </div>
                          </>
                          :
                          <p className="text-red-500 font-bold text-base">
                            {formatPrice(p.price)}
                          </p>
                      }

                      <div className="flex items-center gap-1 mt-1">
                        {p.rating > 0 ? (
                          <>
                            <FaStar className='text-sm text-yellow-400' />
                            <span className="text-sm font-semibold text-gray-700">{p.rating}</span>
                          </>
                        ) : ''}
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