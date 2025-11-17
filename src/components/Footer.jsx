import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-[#f3f6fa]'>
      <div className='w-[90%] flex flex-wrap mx-auto py-16 md:pb-10 lg:pb-16 '>
        <div className='w-full md:w-3/12 lg:w-4/12'>
          <div className='flex flex-col gap-2'>
            <img className='w-[190px] h-[70px]' src="/images/logo.png" alt="logo" />
            <ul className='flex flex-col gap-2'>
              <li>Address: Di Trạch, Hoài Đức,  Bắc Từ Liêm, Hà Nội</li>
              <li>Điện thoại: 0387444214</li>
              <li>Email: dinhcanhh2004@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className='w-full md:w-8/12 lg:w-4/12'>
          <div className='flex justify-start md:justify-center mt-6 md:mt-0 w-full'>
            <div className='w-full'>
              <h2 className='text-lg font-bold mb-2'>Liên kết hữu ích</h2>
              <div className='w-full md:flex mt-5 md:mt-0 md:justify-between gap-8 lg:gap-10'>
                <ul className='flex flex-col gap-2 text-slate-600 font-semibold'>
                  <li><Link to='#'>Giới thiệu</Link></li>
                  <li><Link to='#'>Cửa hàng</Link></li>
                  <li><Link to='#'>Thông tin phân tích</Link></li>
                  <li><Link to='#'>Gửi khiếu nại</Link></li>
                  <li><Link to='#'>Tìm siêu thị</Link></li>
                  <li><Link to='#'>Chính sách bảo mật</Link></li>
                  <li><Link to='#'>Blog</Link></li>
                </ul>
                <ul className='hidden md:flex flex-col gap-2 text-slate-600 font-semibold'>
                  <li><Link to='#'>Tích điểm Quà tặng VIP</Link></li>
                  <li><Link to='#'>Lịch sử mua hàng</Link></li>
                  <li><Link to='#'>Đăng ký bán hàng </Link></li>
                  <li><Link to='#'>Chính sách bảo hành</Link></li>
                  <li><Link to='#'>Blog</Link></li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        <div className='w-full mt-6 ml-0 lg:ml-20 lg:mt-0 lg:w-3/12'>
          <div className='w-full flex flex-col justify-start gap-5'>
            <h2 className='font-bold text-lg lg:mb-2 '>Tham gia cùng chúng tôi</h2>
            <span>Nhận email cập nhật về các ưu đãi mới nhất và mua sắm đặc biệt của bạn</span>
            <div className='w-full h-10 bg-white border border-slate-400 relative'>
              <form>
                <input
                  placeholder='Nhập email...'
                  type="text"
                  className='h-full bg-transparent w-full pl-3 outline-none py-2 pr-16'
                />
                <button className='h-full absolute top-0 right-0 bg-[#059473] text-white uppercase px-4'>
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;