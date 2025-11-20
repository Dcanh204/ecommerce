import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import Rating from '../components/Rating';
import { RiAddFill, RiShoppingCartLine, RiSubtractFill } from 'react-icons/ri';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { FaEye, FaFacebookF, FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { SiZalo } from 'react-icons/si';
import Reviews from '../components/Reviews';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const ProductDetails = () => {
  const images = [1, 2, 3, 4, 5, 6];

  const [image, setImage] = useState('');
  const [state, setState] = useState('reviews')
  const discount = 10;
  const stock = 10;
  const price = 100000;
  // tính giảm giá
  const finalPrice = discount > 0 ? price - (price * discount / 100) : price;
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1350 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 1350, min: 1025 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1025, min: 700 },
      items: 6
    },
    mdtablet: {
      breakpoint: { max: 700, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3
    },
    smmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1
    }
  };
  return (
    <div>
      <Header />
      <section className='pt-35 sm:pt-30 lg:pt-40'>
        <div className='bg-slate-100 py-3 mb-5'>
          <div className='w-[80%] mx-auto h-full py-5'>
            <div className='flex justify-start items-center text-slate w-full gap-3'>
              <Link to='/'>Trang chủ</Link>
              <span className='pt-1'><IoIosArrowForward /></span>
              <Link to='/'>Danh Mục</Link>
              <span className='pt-1'><IoIosArrowForward /></span>
              <Link to='/'>Tên sản phẩm</Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='w-[80%] mx-auto h-full py-5'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
            <div className='border border-[#e9ebf0] rounded-lg shadow-md p-2'>
              <div className='p-10 mb-5'>
                <img className='w-full h-[400px]' src={image ? `/images/products/${image}.webp` : `/images/products/${images[1]}.webp`} alt="product" />
              </div>
              {
                images && <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  infinite={true}
                  transitionDuration={500}
                >
                  {
                    images.map((img, i) => <div key={i} onClick={() => setImage(img)} className='flex gap-1 justify-center items-center'>
                      <img className='h-[120px] cursor-pointer' src={`/images/products/${i + 1}.webp`} alt="" />
                    </div>)
                  }
                </Carousel>
              }
            </div>

            <div className='flex flex-col gap-5'>
              <h3 className='font-semibold text-3xl text-slate-600'> Product name</h3>
              <div className='flex justify-start items-center gap-4'>
                <div className='text-xl flex items-center gap-2'>
                  <Rating ratings={4.5} />
                  <span>(24 đánh giá)</span>
                </div>
              </div>
              <h3 className='font-semibold text-xl text-slate-600'> Thương hiệu: </h3>
              <h3 className='font-semibold text-xl text-slate-600'> Tên cửa hàng:</h3>
              <div>
                <div className='flex items-center gap-3'>
                  {discount > 0
                    ? (
                      <>
                        <h2 className='font-semibold text-3xl text-slate-600'>Giá: </h2>
                        <span className='text-3xl font-bold text-red-600'>
                          {finalPrice.toLocaleString()}đ
                        </span>

                        <span className='text-lg line-through text-slate-400'>
                          {price.toLocaleString()}đ
                        </span>

                        <span className='text-sm font-semibold bg-red-100 text-red-600 px-2 py-1 rounded'>
                          -{discount}%
                        </span>
                      </>
                    )
                    : (
                      <>
                        <h2 className='font-semibold text-3xl text-slate-600'>Giá: </h2>
                        <span className='text-3xl font-bold text-slate-700'>
                          {price.toLocaleString()}đ
                        </span>
                      </>

                    )}
                </div>

              </div>

              <div className="text-slate-700">
                <p className=" w-full 2xl:w-[80%] leading-relaxed text-base tracking-wide bg-slate-50 p-4 rounded-lg border border-slate-200">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic a nostrum,
                  libero maxime commodi possimus quis aliquam? Possimus voluptatem at impedit
                  praesentium consequuntur atque eveniet dignissimos. Molestias placeat
                  possimus soluta.
                </p>
              </div>
              <div className='flex flex-col gap-3 pb-10 border-b border-[#e9ebf0]'>
                {
                  stock ?
                    <>
                      <div className='flex justify-start items-center'>
                        <h2 className='font-medium text-lg text-slate-600 mr-10'>Số lượng: </h2>
                        <button className='h-8 w-10 rounded-l-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                          <RiSubtractFill />
                        </button>
                        <input type="text" className='h-8 text-center w-10 border border-[#e6e9ed] outline-none px-2 ' placeholder='1' />
                        <button className='h-8 w-10 rounded-r-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                          <RiAddFill />
                        </button>
                      </div>
                      <div className='flex gap-4'>
                        <div>
                          <button className="flex items-center justify-center gap-2 bg-[#059473] text-white px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer">
                            <MdOutlineAddShoppingCart />
                            Thêm vào giỏ
                          </button>
                        </div>
                        <div>
                          <button className="flex items-center justify-center gap-2 bg-[#059473] text-white px-4 py-3 rounded-lg hover:bg-green-500 transition cursor-pointer">
                            <FaHeart />
                          </button>
                        </div>
                      </div>
                    </>

                    : ''
                }
              </div>
              <div className='flex py-5 gap-5'>
                <div className='w-[150px] font-bold  text-black text-xl flex flex-col gap-5'>
                  <span>Tình trạng: </span>
                  <span>Chia sẻ: </span>
                </div>
                <div className='flex flex-col gap-5'>
                  <span className={`text-${stock ? 'green' : 'red'}-500 text-lg font-medium`}>
                    {stock ? `Còn ${stock} sản phẩm` : 'Hết hàng'}
                  </span>
                  <ul className='flex justify-start items-center gap-4'>
                    <li>
                      <a type='_black' className='w-[38px] h-[38px] hover:bg-[#059473] text-white flex justify-center items-center rounded-full bg-[#0866ff]' href="https://www.facebook.com/dinhcanh24"><FaFacebookF /></a>
                    </li>
                    <li>
                      <a type='_black' className='w-[38px] h-[38px] hover:bg-[#059473] text-white flex justify-center items-center rounded-full bg-[#06b5d4]' href="https://zalo.me/0387444214"><SiZalo /></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='flex gap-4'>
                {
                  stock ? <button className='px-8 py-3 rounded-md cursor-pointer h-[50px] bg-[#fc7600] text-white'>
                    Mua ngay
                  </button>
                    : ''
                }
                <Link to='#' className='px-8 py-3 rounded-md cursor-pointer h-[50px] bg-red-500 text-white'>Chat hỗ trợ</Link>
              </div>
            </div>


          </div>
        </div>
      </section>
      <section>
        <div className='w-[80%] mx-auto h-full pb-16'>
          <div className='flex flex-wrap'>
            <div className='w-full md:w-[70%]'>
              <div className='pr-0 lg:pr-4'>
                <div className='grid grid-cols-2'>
                  <button onClick={() => setState('reviews')} className={`py-2 px-5 hover:text-slate-500 hover:bg-[#c9eee5] cursor-pointer ${state === 'reviews' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-600'} rounded-lg`}>Đánh giá</button>
                  <button onClick={() => setState('description')} className={`py-1 px-5 hover:text-white hover:bg-[#c9eee5] cursor-pointer ${state === 'description' ? 'bg-[#059473] text-white' : 'bg-slate-200 text-slate-600'} rounded-lg`}>Mô tả</button>
                </div>
                <div>
                  {state === 'reviews' ? <Reviews /> : <p className='py-5 text-slate-600'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error voluptatem adipisci quo dolorum impedit delectus, odit explicabo praesentium expedita veniam eveniet velit eius maxime, dolor minus earum tenetur ut. Commodi!
                  </p>}
                </div>
              </div>
            </div>
            <div className='w-full md:w-[30%]'>
              <div className='pl-0 lg:pl-4 '>
                <div className='px-3 py-2 bg-slate-200 text-slate-600 rounded-lg'>
                  <h2 className='font-medium text-lg'>Gợi ý từ cửa hàng</h2>
                </div>
                <div className='mx-auto flex flex-col gap-5 mt-3 border border-[#e9ebf0] p-3 2xl:px-15 2xl:pt-5 rounded-md'>
                  {
                    [1, 2, 3].map((p, i) => {
                      return (
                        <div key={i} className='border border-[#e9ebf0] overflow-hidden group max-h-[450px] p-2 rounded-lg'>
                          <div className='relative'>
                            {
                              discount > 0 && <div className='flex justify-center items-center absolute left-2 top-2 bg-red-500 rounded-full w-[38px] h-[38px] text-white'>
                                {discount}%
                              </div>
                            }


                            <img src={`/images/products/${i + 1}.webp`} alt="" className='transition-all duration-500 group-hover:-translate-y-2 w-full h-[250px]' />
                            <ul className='flex w-full transition-all duration-700 justify-center items-center gap-2 absolute'>
                              <Link className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                                <FaRegHeart />
                              </Link>
                              <Link to='/product/details/new' className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                                <FaEye />
                              </Link>
                              <Link className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                                <RiShoppingCartLine />
                              </Link>
                            </ul>
                          </div>
                          <Link to='/product/details/new'>
                            <div className='p-3 flex flex-col gap-1'>
                              <h3 className='text-base md:text-[18px] font-medium line-clamp-2'>OPPO Reno14 F 5G 12GB/256GB</h3>
                              <div className="mt-1">
                                <p className="text-red-500 font-bold text-lg">
                                  8.130.000₫
                                </p>
                                <div>
                                  <span className='text-gray-400 line-through text-base'>8.830.000₫</span>
                                  <span className='text-red-500 font-medium text-base'> -11%</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <FaStar className='text-sm text-yellow-400' />
                                <span className="text-sm font-semibold text-gray-700">4.9</span>
                                <span className="text-xs text-gray-500">· Đã bán 11,7k</span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <section className='pb-20'>
        <div className='w-[80%] mx-auto h-full '>
          <h2 className='text-3xl font-medium text-slate-600 py-8'>Sản phẩm liên quan</h2>
          <div>
            <Swiper
              slidesPerView='auto'
              spaceBetween={25}
              loop={true}
              breakpoints={{
                1280: {
                  slidesPerView: 5
                },
                1024: {
                  slidesPerView: 4
                },
                768: {
                  slidesPerView: 3
                },
                640: {
                  slidesPerView: 2
                },
                390: {
                  slidesPerView: 1
                },
              }}
              pagination={{
                clickable: true,
                el: '.custom_bullet'
              }}
              modules={[Pagination]}
              className='mySwiper'
            >
              {
                [1, 2, 3, 4, 5, 6].map((p, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div key={i} className='border border-[#e9ebf0] overflow-hidden group max-h-[450px] p-2 rounded-lg'>
                        <div className='relative'>
                          <div className='flex justify-center items-center absolute left-2 top-2 bg-red-500 rounded-full w-[38px] h-[38px] text-white'>
                            8%
                          </div>

                          <img src={`/images/products/${i + 1}.webp`} alt="" className='transition-all duration-500 group-hover:-translate-y-2 w-full h-[250px]' />
                          <ul className='flex w-full transition-all duration-700 justify-center items-center gap-2 absolute'>
                            <Link className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                              <FaRegHeart />
                            </Link>
                            <Link to='/product/details/new' className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                              <FaEye />
                            </Link>
                            <Link className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                              <RiShoppingCartLine />
                            </Link>
                          </ul>
                        </div>
                        <Link to='/product/details/new'>
                          <div className='p-3 flex flex-col gap-1'>
                            <h3 className='text-base md:text-[18px] font-medium line-clamp-2'>OPPO Reno14 F 5G 12GB/256GB</h3>
                            <div className="mt-1">
                              <p className="text-red-500 font-bold text-lg">
                                8.130.000₫
                              </p>
                              <div>
                                <span className='text-gray-400 line-through text-base'>8.830.000₫</span>
                                <span className='text-red-500 font-medium text-base'> -11%</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <FaStar className='text-sm text-yellow-400' />
                              <span className="text-sm font-semibold text-gray-700">4.9</span>
                              <span className="text-xs text-gray-500">· Đã bán 11,7k</span>
                            </div>
                          </div>
                        </Link>


                      </div>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>

          </div>
          <div className='w-full flex justify-center items-center py-10'>
            <div className='custom_bullet flex justify-center gap-3 cursor-pointer'>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails;