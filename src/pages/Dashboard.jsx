import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaBorderAll, FaHeart, FaList } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import { BsChatDotsFill } from 'react-icons/bs';
import { RiLockPasswordLine, RiLogoutCircleLine } from 'react-icons/ri';

const Dashboard = () => {
  const [filterShow, setFilterShow] = useState(false);
  return (
    <div>
      <Header />
      <section className=' pt-35 pb-25 sm:pt-30 h-screen bg-slate-200'>
        <div className='w-[90%] mx-auto block lg:hidden '>
          <button onClick={() => setFilterShow(!filterShow)} className='text-center bg-green-500 p-2 cursor-pointer rounded-md text-white'><FaList /></button>
        </div>
        <div className='h-full mx-auto'>
          <div className='w-[90%] lg:w-full py-5 flex mx-auto relative'>
            <div className={`rounded-md z-50 absolute ${filterShow ? '-left-4' : '-left-[360px]'} lg:static lg:left-0 lg:mt-8 w-[200px] ml-4 bg-white`}>
              <ul className='py-2 text-slate-600 px-4'>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-base'><IoIosHome /></span>
                  <Link to='/dashboard' className='text-sm'>Dashboard</Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-base'><FaBorderAll /></span>
                  <Link to='/dashboard/my-orders' className='text-sm'>Đơn hàng</Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-base'><FaHeart /></span>
                  <Link to='/dashboard/my-wishlist' className='text-sm'>Yêu thích</Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-base'><BsChatDotsFill /></span>
                  <Link to='/dashboard' className='text-sm'>Nhắn tin</Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-base'><RiLockPasswordLine /></span>
                  <Link to='/dashboard/change-password' className='text-sm'>Đổi mật khẩu</Link>
                </li>
                <li className='flex justify-start items-center gap-2 py-2'>
                  <span className='text-base'><RiLogoutCircleLine /></span>
                  <Link to='/dashboard' className='text-sm'>Đăng xuất</Link>
                </li>
              </ul>
            </div>
            <div className='w-full lg:w-calc(100%-200px)'>
              <div className='mx-0 lg:mx-4 mt-0 lg:mt-8'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;