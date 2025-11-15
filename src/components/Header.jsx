import React from 'react';
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FaFacebookF, FaGithub, FaUser, FaLock } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { Link } from 'react-router-dom';
const Header = () => {

  const user = true;
  return (
    <div className='w-full bg-white'>
      <div className='header-top bg-[#caddff] hidden lg:block'>
        <div className='w-[85%] lg:w-[90%] mx-auto'>
          <div className='w-full flex justify-between items-center h-[50px] text-slate-500'>
            <ul className='flex justify-start items-center gap-8 font-semibold text-black'>
              <li className='relative flex justify-center items-center gap-2 after:absolute after:h-[18px] after:w-px
              after:bg-[#afafaf] after:-right-4'>
                <span><MdEmail /></span>
                <span>dinhcanhh2004@gmail.com</span>
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
    </div>
  );
};

export default Header;