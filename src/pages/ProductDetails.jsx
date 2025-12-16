import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { product_details } from '../stores/reducers/productReducers';
import toast from 'react-hot-toast';
import { add_to_cart, add_to_wishlist, messageClear } from '../stores/reducers/cartReducers';


const ProductDetails = () => {
  const navigation = useNavigate();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { product, relatedProducts, fromStore } = useSelector(state => state.product);
  const { successMessage, errorMessage } = useSelector(state => state.cart);
  useEffect(() => {
    dispatch(product_details(slug));
  }, [slug, dispatch])
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState('');
  const [state, setState] = useState('reviews')

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

  const increment = () => {
    if (quantity > product.stock) {
      toast.error("Vượt quá số lượng tồn kho");
    } else {
      setQuantity(quantity + 1);
    }
  }

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const add_cart = () => {
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập!");
      navigation('/login');
    } else {
      dispatch(add_to_cart({
        userId: userInfo.id,
        quantity,
        productId: product._id
      }))
    }
  }

  const add_wishlist = () => {
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập!");
      navigation('/login');
    } else {
      dispatch(add_to_wishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        discount: product.discount,
        rating: product.rating,
        slug: product.slug
      }))
    }

  }

  const buynow = () => {
    let price = 0;
    if (product.discount !== 0) {
      price = product.price - (product.price * product.discount) / 100;
    } else {
      price = product.price
    }

    const obj = [
      {
        sellerId: product.sellerId,
        shopName: product.shopName,
        price: price * quantity,
        products: [
          {
            quantity,
            productInfo: product
          }
        ]
      }
    ]

    navigation('/shipping', {
      state: {
        products: obj,
        price: price * quantity,
        shipping_fee: 20000,
        items: 1,
      }
    })
  }
  const add_wishlist_byId = (product) => {
    if (!userInfo) {
      toast.error("Vui lòng đăng nhập!");
      navigation('/login');
    } else {
      dispatch(add_to_wishlist({
        userId: userInfo.id,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        discount: product.discount,
        rating: product.rating,
        slug: product.slug
      }))
    }

  }

  // tính giảm giá
  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }
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
          <div className='w-[80%] mx-auto h-full py-1'>
            <div className='flex justify-start items-center text-slate w-full gap-3'>
              <Link to='/'>Trang chủ</Link>
              <span className='pt-1'><IoIosArrowForward /></span>
              <Link to='/'>{product.category}</Link>
              <span className='pt-1'><IoIosArrowForward /></span>
              <Link to='/'>{product.name}</Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='w-[80%] mx-auto h-full py-3'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
            <div className='border border-[#e9ebf0] rounded-lg shadow-md p-2'>
              <div className='p-10 mb-5'>
                <img className='w-full h-[400px]' src={image ? image : product?.images?.[0]} alt="product" />
              </div>
              {
                product.images && <Carousel
                  responsive={responsive}
                  autoPlay={true}
                  infinite={true}
                  transitionDuration={500}
                >
                  {
                    product.images.map((img, i) => <div key={i} onClick={() => setImage(img)} className='flex gap-1 justify-center items-center border border-[#f2f2f2]'>
                      <img className='h-[60px] cursor-pointer' src={img} alt="" />
                    </div>)
                  }
                </Carousel>
              }
            </div>

            <div className='flex flex-col gap-3'>
              <h3 className='font-semibold text-2xl text-slate-600'>{product.name}</h3>
              <div className='flex justify-start items-center gap-4'>
                <div className='text-base flex items-center gap-2'>
                  <Rating ratings={4.5} />
                  <span>(24 đánh giá)</span>
                </div>
              </div>
              <h3 className=' text-base text-slate-600'> Thương hiệu: {product.brand} </h3>
              <h3 className=' text-base text-slate-600'> Tên cửa hàng: {product.shopName}</h3>
              <div>
                <div className='flex items-center gap-3'>
                  {product.discount > 0
                    ? (
                      <>
                        <h2 className='text-base text-slate-600'>Giá: </h2>
                        <span className='text-xl font-bold text-red-600'>
                          {formatPrice(product.price - (product.price * product.discount) / 100)}
                        </span>

                        <span className='text-base line-through text-slate-400'>
                          {formatPrice(product.price)}
                        </span>

                        <span className='text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded'>
                          -{product.discount}%
                        </span>
                      </>
                    )
                    : (
                      <>
                        <h2 className=' text-base text-slate-600'>Giá: </h2>
                        <span className='text-xl font-bold text-red-600'>
                          {formatPrice(product.price)}
                        </span>
                      </>

                    )}
                </div>

              </div>

              <div className="text-slate-700">
                {
                  product.description && <p className=" w-full 2xl:w-[80%] leading-relaxed text-base tracking-wide bg-slate-50 p-4 rounded-lg border border-slate-200">
                    {product.description}
                  </p>
                }

              </div>
              <div className='flex flex-col gap-3 pb-10 border-b border-[#e9ebf0]'>
                {
                  product.stock ?
                    <>
                      <div className='flex justify-start items-center'>
                        <h2 className='font-medium text-base text-slate-600 mr-10'>Số lượng: </h2>
                        <button onClick={decrement} className='h-7 w-8 rounded-l-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                          <RiSubtractFill />
                        </button>
                        <input readOnly type="text" className='h-7 text-center w-8 border border-[#e6e9ed] outline-none px-2 ' value={quantity} />
                        <button onClick={increment} className='h-7 w-8 rounded-r-md border border-[#e6e9ed] flex justify-center items-center cursor-pointer'>
                          <RiAddFill />
                        </button>
                      </div>
                      <div className='flex gap-4'>
                        <div>
                          <button onClick={add_cart} className="flex items-center justify-center gap-2 bg-[#059473] text-white px-4 py-2 rounded-lg hover:bg-green-500 cursor-pointer">
                            <MdOutlineAddShoppingCart />
                            Thêm vào giỏ
                          </button>
                        </div>
                        <div>
                          <button onClick={add_wishlist} className="flex items-center justify-center gap-2 bg-[#059473] text-white px-4 py-3 rounded-lg hover:bg-green-500 transition cursor-pointer">
                            <FaHeart />
                          </button>
                        </div>
                      </div>
                    </>

                    : ''
                }
              </div>
              <div className='flex py-5 gap-5'>
                <div className='w-[150px] font-bold  text-black text-lg flex flex-col gap-5'>
                  <span>Tình trạng: </span>
                  <span>Chia sẻ: </span>
                </div>
                <div className='flex flex-col gap-5'>
                  <span className={`text-${product.stock ? 'green' : 'red'}-500 text-lg font-medium`}>
                    {product.stock ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
                  </span>
                  <ul className='flex justify-start items-center gap-4'>
                    <li>
                      <a type='_black' className='w-[30px] h-[30px] hover:bg-[#059473] text-white flex justify-center items-center rounded-full bg-[#0866ff]' href="https://www.facebook.com/dinhcanh24"><FaFacebookF /></a>
                    </li>
                    <li>
                      <a type='_black' className='w-[30px] h-[30px] hover:bg-[#059473] text-white flex justify-center items-center rounded-full bg-[#06b5d4]' href="https://zalo.me/0387444214"><SiZalo /></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='flex gap-4'>
                {
                  product.stock ? <button onClick={buynow} className='px-5 py-2 rounded-md cursor-pointer bg-[#fc7600] text-white'>
                    Mua ngay
                  </button>
                    : ''
                }
                <Link to='#' className='px-5 py-2 rounded-md cursor-pointer bg-red-500 text-white'>Chat hỗ trợ</Link>
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
                  {state === 'reviews' ? <Reviews product={product} /> : <p className='py-5 text-slate-600'>
                    {product.description}
                  </p>}
                </div>
              </div>
            </div>
            <div className='hidden lg:block lg:w-[30%]'>
              <div className='pl-0 lg:pl-4 '>
                <div className='px-3 py-2 bg-slate-200 text-slate-600 rounded-lg'>
                  <h2 className='font-medium text-base'>Gợi ý từ cửa hàng</h2>
                </div>
                <div className='mx-auto flex flex-col gap-5 mt-3 border border-[#e9ebf0] p-3 2xl:px-15 2xl:pt-5 rounded-md'>
                  {
                    fromStore?.map((p, i) => {
                      return (
                        <div key={i} className='border border-[#e9ebf0] overflow-hidden group max-h-[450px] p-2 rounded-lg'>
                          <div className='relative'>
                            {
                              p.discount > 0 && <div className='flex justify-center items-center absolute left-2 top-2 bg-red-500 rounded-full w-[38px] h-[38px] text-white'>
                                {p.discount}%
                              </div>
                            }
                            <img src={p.images[0]} alt="" className='transition-all duration-500 group-hover:-translate-y-2 w-full h-[250px]' />
                            <ul className='flex w-full transition-all duration-700 justify-center items-center gap-2 absolute'>
                              <li onClick={() => add_wishlist_byId(p)} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                                <FaRegHeart />
                              </li>
                              <Link to={`/product/details/${p.slug}`} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                                <FaEye />
                              </Link>
                              <li onClick={add_cart} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                                <RiShoppingCartLine />
                              </li>
                            </ul>
                          </div>
                          <Link to={`/product/details/${p.slug}`}>
                            <div className='p-3 flex flex-col gap-1'>
                              <h3 className='text-base font-medium line-clamp-2'>{p.name}</h3>
                              <div className="mt-1">
                                {p.discount > 0 ?
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
                              </div>
                              {
                                p.rating
                                  ? <div className="flex items-center gap-1 mt-1">
                                    <FaStar className='text-sm text-yellow-400' />
                                    <span className="text-sm font-semibold text-gray-700">{p.rating}</span>
                                  </div>
                                  : ''
                              }
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
          <h2 className='text-2xl font-medium text-slate-600 py-8'>Sản phẩm liên quan</h2>
          <div>
            <Swiper
              slidesPerView='auto'
              spaceBetween={25}
              loop={relatedProducts.length >= 6}
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
                relatedProducts?.map((p, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <div key={i} className='border border-[#e9ebf0] overflow-hidden group max-h-[450px] p-2 rounded-lg'>
                        <div className='relative'>
                          {
                            p.discount > 0 && <div className='flex justify-center items-center absolute left-2 top-2 bg-red-500 rounded-full w-[38px] h-[38px] text-white'>
                              {p.discount}%
                            </div>
                          }

                          <img src={p.images[0]} alt="" className='transition-all duration-500 group-hover:-translate-y-2 w-full h-[250px]' />
                          <ul className='flex w-full transition-all duration-700 justify-center items-center gap-2 absolute'>
                            <li onClick={() => add_wishlist_byId(p)} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                              <FaRegHeart />
                            </li>
                            <Link to={`/product/details/${p.slug}`} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                              <FaEye />
                            </Link>
                            <li onClick={add_cart} className='w-[30px] h-[30px] flex justify-center items-center bg-white cursor-pointer rounded-full hover:bg-[#059473] hover:text-white hover:rotate-720 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-15'>
                              <RiShoppingCartLine />
                            </li>
                          </ul>
                        </div>
                        <Link to={`/product/details/${p.slug}`}>
                          <div className='p-3 flex flex-col gap-1'>
                            <h3 className='text-base font-medium line-clamp-2'>{p.name}</h3>
                            <div className="mt-1">
                              {p.discount > 0 ?
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
                            </div>
                            {
                              p.rating
                                ? <div className="flex items-center gap-1 mt-1">
                                  <FaStar className='text-sm text-yellow-400' />
                                  <span className="text-sm font-semibold text-gray-700">{p.rating}</span>
                                </div>
                                : ''
                            }
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