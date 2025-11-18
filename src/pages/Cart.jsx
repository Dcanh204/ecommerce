import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Cart = () => {

  const cart_products = [1];
  const out_stock_propducts = [1];
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
                      <div className=' bg-[#eeeeee] md:bg-white p-4'>
                        <h2 className='font-semibold text-xl text-green-500'>
                          Giỏ hàng có {cart_products.length} sản phẩm
                        </h2>
                      </div>
                      {
                        <div className='flex bg-[#eeeeee] md:bg-white p-4 flex-col gap-2'>
                          <div className='flex justify-start items-center'>
                            <h2 className='text-base text-slate-600 font-bold'>Thế giới di động</h2>
                          </div>
                          {
                            <div className='w-full flex flex-wrap '>
                              <div className='flex w-full sm:w-7/12 gap-2 '>
                                <div className='flex gap-4 justify-start items-center'>
                                  <img className='w-20 h-20' src="/images/products/3.webp" alt="product" />
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
                              </div>
                            </div>
                          }
                        </div>
                      }
                    </div>
                  </div>

                </div>
                <div className='w-full bg-amber-200 lg:w-[35%]'>

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