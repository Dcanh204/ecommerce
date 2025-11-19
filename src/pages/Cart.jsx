import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { RiAddBoxFill, RiAddFill, RiSubtractFill } from 'react-icons/ri';

const Cart = () => {
  const navigation = useNavigate();

  const cart_products = [1, 2];
  const out_stock_propducts = [1, 2];

  const redirect = () => {
    navigation('/shipping', {
      state: {
        products: [],
        price: 360000,
        shipping_fee: 40000,
        item: 2,
      }
    })
  }
  return (
    <div>
      <Header />
      <section className='pt-35 pb-25 sm:pt-30 lg:pt-40 md:bg-[#eeeeee]'>
        <div className='w-[90%] border mx-auto border-[#e9ebf0] mb-10'></div>
        <div className='w-[90%] xl:w-[70%] mx-auto py-16'>
          {
            cart_products.length > 0 || out_stock_propducts > 0
              ?
              <div className='flex flex-wrap'>
                <div className='w-full lg:w-[70%] xl:w-[65%]'>
                  <div className='pr-0 lg:pr-3'>
                    <div className='flex flex-col gap-3'>
                      <div className=' bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md'>
                        <h2 className='font-semibold text-xl text-green-500'>
                          Giỏ hàng có {cart_products.length} sản phẩm
                        </h2>
                      </div>
                      {
                        cart_products.map((p, i) => <div key={i} className='flex bg-[#eeeeee] md:bg-white p-4 flex-col gap-2 rounded-lg shadow-md'>
                          <div className='flex justify-start items-center'>
                            <h2 className='text-base text-slate-600 font-bold'>Thế giới di động</h2>
                          </div>
                          {
                            [1, 2].map((item, i) => <div key={i} className='w-full flex flex-wrap '>
                              <div className='flex w-full sm:w-7/12 gap-2 '>
                                <div className='flex gap-4 justify-start items-center'>
                                  <img className='w-20 h-20' src={`images/products/${i + 1}.webp`} alt="product" />
                                  <div>
                                    <h2 className='font-bold text-lg text-slate-600'>Product name</h2>
                                    <span className='text-sm text-slate-600'>Brand: Apple</span>
                                  </div>
                                </div>
                              </div>
                              <div className='flex w-full sm:w-5/12 mt-3 sm:mt-0 justify-between'>
                                <div className='pl-0 sm:pl-4'>
                                  <h2 className='font-bold text-lg text-red-500'>1.800.000₫</h2>
                                  <p className='text-gray-400 line-through text-base'>2.000.000₫</p>
                                  <p className='text-red-500 font-medium text-base'> -10%</p>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                  <div className='flex justify-center items-center'>
                                    <button className='h-7 w-7 rounded-l-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                                      <RiSubtractFill />
                                    </button>
                                    <input type="text" className='h-7 w-7 border border-[#e6e9ed] outline-none px-2 ' placeholder='1' />
                                    <button className='h-7 w-7 rounded-r-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                                      <RiAddFill />
                                    </button>
                                  </div>
                                  <button className='text-[#6e6e6e] cursor-pointer'>Xóa</button>
                                </div>
                              </div>
                              <div className='w-full h-px border border-[#e9ebf0] mx-auto my-2'></div>
                            </div>)
                          }
                        </div>)
                      }
                      {
                        out_stock_propducts.length > 0 && <div className='flex flex-col gap-3'>
                          <div className=' bg-[#eeeeee] md:bg-white p-4 rounded-lg shadow-md'>
                            <h2 className='font-semibold text-xl text-red-500'>
                              Sản phẩm hiện hết hàng
                            </h2>
                          </div>
                          <div className='flex bg-[#eeeeee] md:bg-white p-4 flex-col gap-2 rounded-lg shadow-md'>
                            {
                              [1, 2].map((item, i) => <div key={i} className='w-full flex flex-wrap '>
                                <div className='flex w-full sm:w-7/12 gap-2 '>
                                  <div className='flex gap-4 justify-start items-center'>
                                    <img className='w-20 h-20' src={`images/products/${i + 1}.webp`} alt="product" />
                                    <div>
                                      <h2 className='font-bold text-lg text-slate-600'>Product name</h2>
                                      <span className='text-sm text-slate-600'>Brand: Apple</span>
                                    </div>
                                  </div>
                                </div>
                                <div className='flex w-full sm:w-5/12 mt-3 sm:mt-0 justify-between'>
                                  <div className='pl-0 sm:pl-4'>
                                    <h2 className='font-bold text-lg text-red-500'>1.800.000₫</h2>
                                    <p className='text-gray-400 line-through text-base'>2.000.000₫</p>
                                    <p className='text-red-500 font-medium text-base'> -10%</p>
                                  </div>
                                  <div className='flex gap-2 flex-col'>
                                    <div className='flex justify-center items-center'>
                                      <button className='h-7 w-7 rounded-l-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                                        <RiSubtractFill />
                                      </button>
                                      <input type="text" className='h-7 w-7 border border-[#e6e9ed] outline-none px-2 ' placeholder='1' />
                                      <button className='h-7 w-7 rounded-r-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                                        <RiAddFill />
                                      </button>
                                    </div>
                                    <button className='text-[#6e6e6e] cursor-pointer'>Xóa</button>
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
                        <h2 className='font-bold text-xl text-slate-600'>Tóm tắt đơn hàng</h2>
                        <div className='flex justify-between items-center'>
                          <span>2 sản phẩm</span>
                          <span>3.600.000₫</span>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Phí vận chuyển</span>
                          <span>40.000₫</span>
                        </div>
                        <div className='flex gap-2'>
                          <input className='w-full px-3 py-2 border border-[#e9ebf0] outline-none rounded-lg focus:border-green-400/50' type="text" placeholder='Nhập mã giảm giá' />
                          <button className='px-5 py-2 bg-[#059473] text-white text-sm rounded-lg whitespace-nowrap cursor-pointer'>Áp dụng</button>
                        </div>
                        <div className='flex justify-between items-center'>
                          <span>Tổng tiền</span>
                          <span className='font-semibold text-red-500 text-lg'>3.640.000₫</span>
                        </div>
                        <button onClick={redirect} className='w-full text-center border border-[#e9ebf0] bg-red-400 px-3 py-2 rounded-lg text-white text-lg font-semibold cursor-pointer uppercase'>Thanh toán</button>
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
                <div className='w-full my-10'>
                  <h2 className='font-bold text-3xl text-slate-600 text-center'>Giỏ hàng trống</h2>
                  <h4 className='text-center font-medium text-slate-400 text-xl mt-2'>Không có sản phẩm nào trong giỏ hàng</h4>
                </div>
                <Link to='/shops'>
                  <button className='px-6 py-3 bg-[#2a83e8] text-white font-medium text-lg rounded-lg border hover:border-[#2a83e8] hover:bg-white hover:text-[#2a83e8]'> Đến cửa hàng</button>
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