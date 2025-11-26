import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaRegHeart, FaStar } from 'react-icons/fa';
import { RiShoppingCartLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { add_to_cart, messageClear } from '../../stores/reducers/cartReducers';

const ShopProduct = ({ products }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { successMessage, errorMessage } = useSelector(state => state.cart);
  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }
  const add_cart = (id) => {
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập!");
      navigation('/login');
    } else {
      dispatch(add_to_cart({
        userId: userInfo.id,
        quantity: 1,
        productId: id
      }))
    }
  }
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear())
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear())
    }
  }, [successMessage, errorMessage, dispatch])
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-2 sm:gap-3 2xl:gap-4 '>
      {
        products.map((item, i) => (
          <div key={i} className='border border-[#e9ebf0] overflow-hidden group max-h-[450px] p-2 rounded-lg'>
            <div className='relative'>
              {
                item.discount > 0
                  ?
                  <div className='flex justify-center items-center absolute left-1 top-1 bg-red-500 rounded-full w-[30px] h-[30px] text-white text-xs'>
                    {item.discount}%
                  </div>
                  : ''
              }


              <img src={item.images[0]} alt="" className='transition-all duration-500 group-hover:-translate-y-2 w-full h-[190px]' />
              <ul className='flex w-full transition-all duration-700 justify-center items-center gap-2 absolute'>
                <li className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15 text-sm'>
                  <FaRegHeart />
                </li>
                <Link to={`/product/details/new`} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15 text-sm'>
                  <FaEye />
                </Link>
                <li onClick={() => add_cart(item._id)} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15 text-sm'>
                  <RiShoppingCartLine />
                </li>
              </ul>
            </div>
            <Link to={`/product/details/new`}>
              <div className='p-3 flex flex-col gap-1'>
                <h3 className='text-sm font-medium line-clamp-2'>{item.name}</h3>
                <div className="mt-1">
                  {
                    item.discount > 0
                      ?
                      <>
                        <p className="text-red-500 font-bold text-base">
                          {formatPrice(item.price - (item.price * item.discount) / 100)}
                        </p>
                        <div>
                          <span className='text-gray-400 line-through text-sm'>{formatPrice(item.price)}</span>
                          <span className='text-red-500 font-medium text-sm'> -{item.discount}%</span>
                        </div>
                      </>
                      :
                      <p className="text-red-500 font-bold text-base">
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