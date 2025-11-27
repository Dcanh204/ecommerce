import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { RiAddBoxFill, RiAddFill, RiSubtractFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { delete_cart_product, get_cart_product, messageClear, quantity_dec, quantity_inc } from '../stores/reducers/cartReducers';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { cart_products, successMessage, price, shipping_fee, outOfStockProduct, buy_product_item } = useSelector(state => state.cart)

  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }
  useEffect(() => {
    if (userInfo) {
      dispatch(get_cart_product(userInfo.id))
    }
  }, [dispatch, userInfo])

  const redirect = () => {
    navigation('/shipping', {
      state: {
        products: cart_products,
        price: price,
        shipping_fee: shipping_fee,
        items: buy_product_item,
      }
    })
  }

  const increment = (quantity, stock, cartId) => {
    const temp = quantity + 1;
    if (temp <= stock) {
      dispatch(quantity_inc(cartId))
    } else {
      toast.error("Số lượng vượt quá tồn kho")
    }
  }

  const decrement = (quantity, cartId) => {
    const temp = quantity - 1;
    if (temp !== 0) {
      dispatch(quantity_dec(cartId));
    }
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear())
      dispatch(get_cart_product(userInfo.id))
    }
  }, [dispatch, userInfo, successMessage])

  const delete_cart = (id) => {
    dispatch(delete_cart_product(id))
  }
  return (
    <div>
      <Header />
      <section className='pt-35 pb-25 sm:pt-30 lg:pt-40 md:bg-[#eeeeee]'>
        <div className='w-[90%] border mx-auto border-[#e9ebf0]'></div>
        <div className='w-[90%] xl:w-[70%] mx-auto py-10'>
          {
            cart_products.length > 0 || outOfStockProduct.length > 0
              ?
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-[70%] xl:w-[65%]'>
                  <div className='pr-0 lg:pr-3'>
                    <div className='flex flex-col gap-3'>
                      <div className=' bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md'>
                        <h2 className='font-semibold text-base text-green-500'>
                          Giỏ hàng có {cart_products.length} sản phẩm
                        </h2>
                      </div>
                      {
                        cart_products.map((p, i) => <div key={i} className='flex bg-[#eeeeee] md:bg-white p-4 flex-col gap-2 rounded-lg shadow-md'>
                          <div className='flex justify-start items-center'>
                            <h2 className='text-sm text-slate-600 font-bold'>{p.shopName}</h2>
                          </div>
                          {
                            p.products.map((item, i) => <div key={i} className='w-full flex flex-wrap '>
                              <div className='flex w-full sm:w-7/12 gap-2 '>
                                <div className='flex gap-4 justify-start items-center'>
                                  <img className='w-20 h-20' src={item.productInfo.images[0]} alt="product" />
                                  <div>
                                    <h2 className='font-bold text-sm text-slate-600'>{item.productInfo.name}</h2>
                                    <span className='text-xs text-slate-600'>Thương hiệu: {item.productInfo.brand}</span>
                                  </div>
                                </div>
                              </div>
                              <div className='flex w-full sm:w-5/12 mt-3 sm:mt-0 justify-between'>
                                {
                                  item.productInfo.discount > 0 ?
                                    <div className='pl-0 sm:pl-4'>
                                      <h2 className='font-bold text-sm text-red-500'>
                                        {formatPrice(item.productInfo.price - (item.productInfo.price * item.productInfo.discount) / 100)}
                                      </h2>
                                      <p className='text-gray-400 line-through text-xs'>{formatPrice(item.productInfo.price)}</p>
                                      <p className='text-red-500 font-medium text-xs'> -{item.productInfo.discount}%</p>
                                    </div>
                                    :
                                    <div className='pl-0 sm:pl-4'>
                                      <h2 className='font-bold text-sm text-red-500'>
                                        {formatPrice(item.productInfo.price)}
                                      </h2>
                                    </div>
                                }

                                <div className='flex gap-1 flex-col'>
                                  <div className='flex justify-center items-center'>
                                    <button onClick={() => decrement(item.quantity, item._id)} className='h-7 w-7 rounded-l-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer text-sm'>
                                      <RiSubtractFill />
                                    </button>
                                    <input readOnly type="text" className='h-7 w-7 border border-[#e6e9ed] outline-none text-center text-sm' value={item.quantity} />
                                    <button onClick={() => increment(item.quantity, item.productInfo.stock, item._id)} className='h-7 w-7 rounded-r-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer text-sm'>
                                      <RiAddFill />
                                    </button>
                                  </div>
                                  <button onClick={() => delete_cart(item._id)} className='text-[#6e6e6e] cursor-pointer text-sm'>Xóa</button>
                                </div>
                              </div>
                              <div className='w-full h-px border border-[#e9ebf0] mx-auto my-2'></div>
                            </div>)
                          }
                        </div>)
                      }
                      {
                        outOfStockProduct.length > 0 && <div className='flex flex-col gap-3'>
                          <div className=' bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md'>
                            <h2 className='font-semibold text-base text-red-500'>
                              Sản phẩm hiện hết hàng
                            </h2>
                          </div>
                          <div className='flex bg-[#eeeeee] md:bg-white p-4 flex-col gap-2 rounded-lg shadow-md'>
                            {
                              outOfStockProduct.map((item, i) => <div key={i} className='w-full flex flex-wrap '>
                                <div className='flex w-full sm:w-7/12 gap-2 '>
                                  <div className='flex gap-4 justify-start items-center'>
                                    <img className='w-20 h-20' src={item.products[0].images[0]} alt="product" />
                                    <div>
                                      <h2 className='font-bold text-sm text-slate-600'>{item.products[0].name}</h2>
                                      <span className='text-xs text-slate-600'>Thương hiệu: {item.products[0].brand}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex w-full sm:w-5/12 mt-3 sm:mt-0 justify-between'>
                                  <div className='pl-0 sm:pl-4'>
                                    <h2 className='font-bold text-sm text-red-500'> {formatPrice(item.products[0].price - (item.products[0].price * item.products[0].discount) / 100)}</h2>
                                    <p className='text-gray-400 line-through text-xs'>{item.products[0].price}</p>
                                    <p className='text-red-500 font-medium text-xs'>-{item.products[0].discount}%</p>
                                  </div>
                                  <div className='flex gap-2 flex-col'>
                                    <div className='flex justify-center items-center'>
                                      <button onClick={() => decrement(item.quantity, item._id)} className='h-7 w-7 rounded-l-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer text-sm'>
                                        <RiSubtractFill />
                                      </button>
                                      <input readOnly type="text" className='h-7 w-7 border border-[#e6e9ed] outline-none text-sm text-center' value={item.quantity} />
                                      <button className='h-7 w-7 rounded-r-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer text-sm'>
                                        <RiAddFill />
                                      </button>
                                    </div>
                                    <button onClick={() => delete_cart(item._id)} className='text-[#6e6e6e] cursor-pointer text-sm'>Xóa</button>
                                  </div>
                                </div>
                                <div className='w-full h-px border border-[#e9ebf0] mx-auto my-2'></div>
                              </div>)
                            }
                          </div>
                        </div>
                      }
                    </div>
                  </div>

                </div>
                <div className='w-full lg:w-[30%]'>
                  <div className='pl-0 lg:pl-3 mt-5 lg:mt-0'>
                    {
                      cart_products.length > 0 && <div className='bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md flex flex-col gap-4'>
                        <h2 className='font-bold text-base text-slate-600'>Tóm tắt đơn hàng</h2>
                        <div className='flex justify-between items-center text-sm'>
                          <span>{buy_product_item} sản phẩm</span>
                          <span>{formatPrice(price)}</span>
                        </div>
                        <div className='flex justify-between items-center text-sm'>
                          <span>Phí vận chuyển</span>
                          <span>{formatPrice(shipping_fee)}</span>
                        </div>
                        <div className='flex gap-2'>
                          <input className='w-full px-3 py-1 border border-[#e9ebf0] outline-none rounded-lg focus:border-green-400/50 text-sm' type="text" placeholder='Nhập mã giảm giá' />
                          <button className='px-5 py-1 bg-[#059473] text-white text-sm rounded-lg whitespace-nowrap cursor-pointer'>Áp dụng</button>
                        </div>
                        <div className='flex justify-between items-center text-sm'>
                          <span>Tổng tiền</span>
                          <span className='font-semibold text-red-500 text-base'>{formatPrice(price + shipping_fee)}</span>
                        </div>
                        <button onClick={redirect} className='w-full text-center border border-[#e9ebf0] bg-red-400 px-3 py-2 rounded-lg text-white text-sm font-semibold cursor-pointer uppercase'>Thanh toán</button>
                      </div>
                    }
                  </div>
                </div>
              </div>
              :
              <div className='w-full flex flex-col justify-center items-center'>
                <div>
                  <img className='max-w-300px max-h-[300px]' src="/images/cartEmpty.png" alt="cart_empty" />
                </div>
                <div className='w-full my-5'>
                  <h2 className='font-bold text-2xl text-slate-600 text-center'>Giỏ hàng trống</h2>
                  <h4 className='text-center font-medium text-slate-400 text-lg mt-2'>Không có sản phẩm nào trong giỏ hàng</h4>
                </div>
                <Link to='/shops'>
                  <button className='px-6 py-3 bg-[#2a83e8] text-white font-medium text-base cursor-pointer rounded-lg border hover:border-[#2a83e8] hover:bg-white hover:text-[#2a83e8]'> Đến cửa hàng</button>
                </Link>
              </div>
          }

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;