import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaFacebookF, FaGithub, FaUser, FaLock, FaList, FaHeart, FaShoppingCart, FaFilter, FaSearch } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { Link, NavLink } from 'react-router-dom';
const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const user = true;
  const wishlist_count = 3;
  const categories = [
    'Điện thoại',
    'Tivi',
    'Đồng Hồ',
    'Tủ lạnh',
    'Máy tính',
    'Máy giặt',
    'Điều hòa'
  ]
  return (
    <div className='w-full bg-white fixed z-5000'>
      <div className='header-top bg-[#caddff] hidden lg:block'>
        <div className='w-[90%] lg:w-[90%] mx-auto'>
          <div className='w-full flex justify-between items-center h-[60px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8 font-semibold text-black'>
              <li className='relative flex justify-center items-center gap-2 after:absolute after:h-[18px] after:w-px
              after:bg-[#afafaf] after:-right-4'>
                <span><MdEmail /></span>
                <a target='_blank' href="mailto:dinhcanhh2004@gmail.com">dinhcanhh2004@gmail.com</a>
              </li>
              <li className='relative flex justify-center items-center gap-2 text-sm'>
                <span><MdOutlinePhoneAndroid /></span>
                <span>(+84) 387 444 214</span>
              </li>
            </ul>

            <div className='flex justify-center items-center gap-8'>
              <div className='flex justify-center items-center gap-4 text-black'>
                <a target='_blank' href="https://www.facebook.com/dinhcanh24"><FaFacebookF /></a>
                <a target='_blank' href="https://zalo.me/0387444214"><SiZalo /></a>
                <a target='_blank' href="https://github.com/Dcanh204"><FaGithub /></a>
              </div>
              <div className='h-[18px] w-px bg-[#afafaf]'></div>
              {
                user
                  ?
                  <Link to='/dashboard' className='flex justify-center items-center gap-2 cursor-pointer text-black'>
                    <span><FaUser /></span>
                    <span>Đình Cảnh</span>
                  </Link>
                  :
                  <Link to='/login' className='flex justify-center items-center gap-2 cursor-pointer text-black text-sm'>
                    <span><FaLock /></span>
                    <span>Login</span>
                  </Link>
              }
            </div>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className='w-[80%] lg:w-[85%] mx-auto'>
          <div className='w-full h-20 lg:h-[100px] flex justify-between items-center flex-wrap'>
            <div className='w-full lg:w-3/12 '>
              <div className='w-full flex justify-between items-center'>
                <Link to='/'>
                  <img src="/images/logo.png" alt="logo" />
                </Link>

                <div onClick={() => setShowSidebar(!showSidebar)} className='flex justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-md cursor-pointer lg:hidden'>
                  <span><FaList /></span>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-9/12'>
              <div className='flex justify-between items-center '>
                <ul className='justify-start items-center gap-8 uppercase font-bold hidden lg:flex'>
                  <li>
                    <NavLink to='/' className={({ isActive }) => `p-2 whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Trang chủ</NavLink>
                  </li>
                  <li>
                    <NavLink to='/shops' className={({ isActive }) => `p-2 whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Cửa hàng</NavLink>
                  </li>
                  <li>
                    <NavLink to='/blog' className={({ isActive }) => `p-2 whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to='/about' className={({ isActive }) => `p-2 whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Giới thiệu</NavLink>
                  </li>
                  <li>
                    <NavLink to='/contact' className={({ isActive }) => `p-2 whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Liên hệ</NavLink>
                  </li>

                </ul>

                <div className='hidden xl:flex justify-center items-center'>
                  <div className='relative'>
                    <div onClick={() => setShowCategory(!showCategory)} className='min-w-[130px] bg-[#059473] text-white flex justify-center items-center gap-3 font-bold cursor-pointer px-2 py-[5px] rounded-z-sm'>
                      <span><FaFilter /></span>
                      <span>Danh mục</span>
                    </div>
                    <div className={`${showCategory ? 'max-h-[400px]' : 'max-h-0'} min-w-[130px]
                    overflow-hidden transition-all duration-500 z-50 bg-[#dbf3ed] absolute top-full left-0 `}>
                      <ul className=' text-slate-600 font-bold'>
                        {
                          categories.map((item, index) => {
                            return (
                              <li key={index} className='flex justify-start items-center gap-2 px-3 py-1.5 hover:bg-amber-500 hover:text-white cursor-pointer'>
                                <Link>{item}</Link>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>

                  <div className='relative'>
                    <form>
                      <input className='w-[300px] lg:w-[200px] 2xl:min-w-[200px] pl-2 pr-9 py-1 border border-slate-700 outline-none focus:border-indigo-400 bg-transparent rounded-r-md' type="text" name='search' placeholder='Tìm kiếm...' />
                      <button className='absolute top-2 right-2 text-slate-700 cursor-pointer'><FaSearch /></button>
                    </form>
                  </div>


                </div>

                <div className='hidden 2xl:flex justify-center items-center'>
                  <div className='flex justify-center gap-7'>
                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] bg-[#e2e2e2] rounded-full'>
                      <span className='text-xl text-green-500'><FaHeart /></span>
                      <div className='absolute w-5 h-5 bg-red-500 rounded-full text-white -top-1.5 -right-2 flex justify-center items-center'>
                        {
                          wishlist_count
                        }
                      </div>
                    </div>
                    <div className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] bg-[#e2e2e2] rounded-full'>
                      <span className='text-xl text-green-500'><FaShoppingCart /></span>
                      <div className='absolute w-5 h-5 bg-red-500 rounded-full text-white -top-1.5 -right-2 flex justify-center items-center'>
                        {
                          wishlist_count
                        }
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* sidebar  */}
      <div className='lg:hidden'>
        <div onClick={() => setShowSidebar(false)} className={`fixed duration-200 transition-all ${showSidebar ? 'visible' : 'invisible'} lg:hidden w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 cursor-pointer`}></div>
        <div className={`w-[300px] z-999 transition-all duration-200  fixed ${showSidebar ? 'top-0 left-0' : '-left-[300px]'} bg-white h-screen py-6 px-8 `}>
          <div className='flex justify-start flex-col gap-6'>
            <Link to='/'>
              <img src="/images/logo.png" alt="logo" />
            </Link>
            <div className='flex justify-start items-center'>
              {
                user
                  ?
                  <Link to='/dashboard' className='flex justify-center items-center gap-2 cursor-pointer text-black'>
                    <span><FaUser /></span>
                    <span>Đình Cảnh</span>
                  </Link>
                  :
                  <Link to='/login' className='flex justify-center items-center gap-2 cursor-pointer text-black text-sm'>
                    <span><FaLock /></span>
                    <span>Login</span>
                  </Link>
              }
            </div>
            <ul className='justify-start items-center gap-8 uppercase font-bold'>
              <li>
                <NavLink to='/' className={({ isActive }) => `p-2 block whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Trang chủ</NavLink>
              </li>
              <l>
                <NavLink to='/shops' className={({ isActive }) => `p-2 block whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Cửa hàng</NavLink>
              </l>
              <li>
                <NavLink to='/blog' className={({ isActive }) => `p-2 block whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Blog</NavLink>
              </li>
              <li>
                <NavLink to='/about' className={({ isActive }) => `p-2 block whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Giới thiệu</NavLink>
              </li>
              <li>
                <NavLink to='/contact' className={({ isActive }) => `p-2 block whitespace-nowrap ${isActive ? 'text-[#059473]' : 'text-slate-600'}`}>Liên hệ</NavLink>
              </li>
            </ul>
            <div className='flex justify-start items-center gap-4 text-black'>
              <a target='_blank' href="https://www.facebook.com/dinhcanh24"><FaFacebookF /></a>
              <a target='_blank' href="https://zalo.me/0387444214"><SiZalo /></a>
              <a target='_blank' href="https://github.com/Dcanh204"><FaGithub /></a>
            </div>
            <ul className='flex justify-start items-center gap-8 font-semibold text-black mt-5'>
              <li className='relative flex justify-center items-center gap-2 after:absolute after:h-px after:w-[100px] after:bg-[#afafaf] after:-top-4 after:left-0'>
                <span><MdEmail /></span>
                <a target='_blank' href="mailto:dinhcanhh2004@gmail.com">dinhcanhh2004@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Màn hình nhỏ hơn MD */}
      <div className='sm:hidden  w-[95%] mx-auto'>
        <div className='flex justify-center items-center'>
          <div className='relative'>
            <div onClick={() => setShowCategory(!showCategory)} className='min-w-[130px] bg-[#059473] text-white flex justify-center items-center gap-3 font-bold cursor-pointer px-2 py-[5px] rounded-z-sm'>
              <span><FaFilter /></span>
              <span>Danh mục</span>
            </div>
            <div className={`${showCategory ? 'max-h-[250px]' : 'max-h-0'} min-w-[130px] overflow-hidden transition-all duration-900 z-50 bg-[#dbf3ed] absolute top-full left-0 `}>
              <ul className=' text-slate-600 font-bold'>
                {
                  categories.map((item, index) => {
                    return (
                      <li key={index} className='flex justify-start items-center gap-2 px-3 py-1.5 hover:bg-amber-500 hover:text-white cursor-pointer'>
                        <Link>{item}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
          <div className='relative'>
            <form>
              <input className='max-w-[300px] pl-2 pr-9 py-1 border border-slate-700 outline-none focus:border-indigo-400 bg-transparent rounded-r-md' type="text" name='search' placeholder='Tìm kiếm...' />
              <button className='absolute top-2 right-2 text-slate-700 cursor-pointer'><FaSearch /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;