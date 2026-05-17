import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-[#f3f6fa] border-t border-gray-200'>
      <div className='w-[90%] lg:w-[85%] mx-auto py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>

          {/* Cột 1: Thông tin thương hiệu */}
          <div className='flex flex-col gap-6'>
            <img className='w-[160px] h-auto' src="/images/logo.png" alt="logo" />
            <p className='text-gray-600 text-sm leading-relaxed'>
              Easy Shop - Nền tảng mua sắm trực tuyến uy tín, cung cấp sản phẩm chất lượng với trải nghiệm tuyệt vời nhất.
            </p>
            <ul className='flex flex-col gap-4 text-sm text-gray-700'>
              <li className='flex items-start gap-3'>
                <FaMapMarkerAlt className='text-[#059473] mt-1' />
                <span>Di Trạch, Hoài Đức, Bắc Từ Liêm, Hà Nội</span>
              </li>
              <li className='flex items-center gap-3'>
                <FaPhoneAlt className='text-[#059473]' />
                <span>0387444214</span>
              </li>
              <li className='flex items-center gap-3'>
                <FaEnvelope className='text-[#059473]' />
                <span>dinhcanhh2004@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Cột 2: Liên kết hữu ích */}
          <div>
            <h2 className='text-lg font-bold text-gray-800 mb-6 relative after:content-[""] after:absolute after:w-12 after:h-1 after:bg-[#059473] after:left-0 after:-bottom-2'>
              Về chúng tôi
            </h2>
            <ul className='flex flex-col gap-3 text-gray-600 text-sm'>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Giới thiệu</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Cửa hàng</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Chính sách bảo mật</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Điều khoản sử dụng</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Blog</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div>
            <h2 className='text-lg font-bold text-gray-800 mb-6 relative after:content-[""] after:absolute after:w-12 after:h-1 after:bg-[#059473] after:left-0 after:-bottom-2'>
              Hỗ trợ khách hàng
            </h2>
            <ul className='flex flex-col gap-3 text-gray-600 text-sm'>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Tích điểm Quà tặng VIP</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Lịch sử mua hàng</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Chính sách bảo hành</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Gửi khiếu nại</Link></li>
              <li><Link to='#' className='hover:text-[#059473] hover:translate-x-1 transition-all inline-block'>Tìm siêu thị</Link></li>
            </ul>
          </div>

          {/* Cột 4: Newsletter */}
          <div className='flex flex-col gap-6'>
            <h2 className='text-lg font-bold text-gray-800 mb-1 relative after:content-[""] after:absolute after:w-12 after:h-1 after:bg-[#059473] after:left-0 after:-bottom-2'>
              Tham gia cùng chúng tôi
            </h2>
            <p className='text-sm text-gray-600'>Nhận email cập nhật về các ưu đãi mới nhất và mua sắm đặc biệt của bạn.</p>
            <div className='w-full'>
              <form className='relative flex'>
                <input
                  placeholder='Nhập email...'
                  type="email"
                  className='w-full px-4 py-2.5 bg-white border border-gray-300 rounded-l-md outline-none focus:border-[#059473] transition-colors text-sm'
                />
                <button className='bg-[#059473] hover:bg-[#047d61] text-white px-5 py-2.5 rounded-r-md transition-all text-sm font-semibold uppercase whitespace-nowrap'>
                  Đăng ký
                </button>
              </form>
            </div>
            {/* Social Links */}
            <div className='flex gap-4 mt-2'>
              <a href="#" className='w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-[#059473] hover:text-white hover:border-[#059473] transition-all'>
                <FaFacebookF size={14} />
              </a>
              <a href="#" className='w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-[#059473] hover:text-white hover:border-[#059473] transition-all'>
                <FaInstagram size={14} />
              </a>
              <a href="#" className='w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-[#059473] hover:text-white hover:border-[#059473] transition-all'>
                <FaTwitter size={14} />
              </a>
              <a href="#" className='w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full text-gray-600 hover:bg-[#059473] hover:text-white hover:border-[#059473] transition-all'>
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;