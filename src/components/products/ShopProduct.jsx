import React from 'react';
import { FaEye, FaRegHeart, FaStar } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const ShopProduct = ({ products }) => {

  const formatPrice = (price) => {
    const rounded = Math.round(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-3 2xl:gap-4 '>
      {
        products.map((item, i) => (
          <div key={i} className='border border-[#e9ebf0] overflow-hidden group max-h-[450px] p-2 rounded-lg'>
            <div className='relative'>
              {
                item.discount > 0
                  ?
                  <div className='flex justify-center items-center absolute left-2 top-2 bg-red-500 rounded-full w-[38px] h-[38px] text-white'>
                    {item.discount}%
                  </div>
                  : ''
              }


              <img src={item.images[0]} alt="" className='transition-all duration-500 group-hover:-translate-y-2 w-full h-[250px]' />
              <ul className='flex w-full transition-all duration-700 justify-center items-center gap-2 absolute'>
                <li onClick={(e) => e.stopPropagation()} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                  <FaRegHeart />
                </li>
                <li onClick={(e) => e.stopPropagation()} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                  <FaEye />
                </li>
                <li onClick={(e) => e.stopPropagation()} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                  <RiShoppingCartLine />
                </li>
              </ul>
            </div>
            <Link to='/login'>
              <div className='p-3 flex flex-col gap-1'>
                <h3 className='text-base md:text-[18px] font-medium line-clamp-2'>{item.name}</h3>
                <div className="mt-1">
                  {
                    item.discount > 0
                      ?
                      <>
                        <p className="text-red-500 font-bold text-lg">
                          {formatPrice(item.price - (item.price * item.discount) / 100)}
                        </p>
                        <div>
                          <span className='text-gray-400 line-through text-base'>{formatPrice(item.price)}</span>
                          <span className='text-red-500 font-medium text-base'> -{item.discount}%</span>
                        </div>
                      </>
                      :
                      <p className="text-red-500 font-bold text-lg">
                        {formatPrice(item.price)}
                      </p>
                  }

                </div>
                {
                  item.rating > 0 && <div className="flex items-center gap-1 mt-1">
                    <FaStar className='text-sm text-yellow-400' />
                    <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                    {/* <span className="text-xs text-gray-500">· Đã bán 11,7k</span> */}
                  </div>
                }

              </div>
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default ShopProduct;