import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaRegHeart, FaStar } from "react-icons/fa";
import { RiShoppingCartLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { add_to_cart, messageClear } from '../../stores/reducers/cartReducers';
const FeatureProduct = ({ products }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { successMessage, errorMessage } = useSelector(state => state.cart);
  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }

  // thêm sản phẩm vào giỏ hàng
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
    <div className='w-[90%] mx-auto flex flex-wrap '>
      <div className='w-full flex justify-center items-center flex-col text-slate-600 pb-5 md:pb-[45px]'>
        <h2 className='text-center font-bold text-xl md:text-3xl'>Sản phẩm nổi bật</h2>
        <div className='w-[100px] h-0.5 bg-[#059473] mt-4'></div>
      </div>

      <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4'>
        {
          products.map((item, i) => (
            <div key={i} className='border border-[#e9ebf0] overflow-hidden group max-h-[450px] p-2 rounded-lg'>
              <div className='relative'>
                {
                  item.discount ? <div className='flex justify-center items-center absolute left-1 top-1 bg-red-500 rounded-full w-[30px] h-[30px] text-white text-xs'>
                    {item.discount}%
                  </div>
                    : ''
                }

                <img src={item?.images[0]} alt="" className='transition-all duration-500 group-hover:-translate-y-2 w-full h-[190px]' />
                <ul className='flex w-full transition-all duration-700 justify-center items-center gap-2 absolute'>
                  <Link className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15 text-sm'>
                    <FaRegHeart />
                  </Link>
                  <Link to='/product/details/new' className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15 text-sm'>
                    <FaEye />
                  </Link>
                  <Link onClick={(e) => {
                    e.preventDefault();
                    add_cart(item._id)
                  }} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15 text-sm'>
                    <RiShoppingCartLine />
                  </Link>
                </ul>
              </div>
              <Link to='/product/details/new'>
                <div className='p-3 flex flex-col gap-1'>
                  <h3 className='text-sm font-medium line-clamp-2'>{item.name}</h3>
                  <div className="mt-1">
                    {item.discount > 0 ?
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
                    item.rating
                      ? <div className="flex items-center gap-1 mt-1">
                        <FaStar className='text-sm text-yellow-400' />
                        <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                      </div>
                      : ''
                  }

                </div>
              </Link>


            </div>

          ))
        }
      </div>


    </div>
  );
};

export default FeatureProduct;