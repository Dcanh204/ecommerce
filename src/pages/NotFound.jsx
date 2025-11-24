import React from 'react';

const NotFound = () => {
  return (
    <div className='w-screen h-screen bg-[#ffffff] flex justify-center items-center'>
      <div className='w-[60%] h-screen flex items-center'>
        <div className='w-3/5 h-screen flex justify-center items-center'>
          <img className='w-[500px] h-[500px]' src="/images/404.png" alt="Not_found" />
        </div>
        <div className='w-2/5'>
          <h1 className='text-5xl font-semibold text-center leading-18'>Xin lỗi, chúng tôi không tìm thấy trang mà bạn cần!</h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;