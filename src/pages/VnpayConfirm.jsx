import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const VnpayConfirm = () => {
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState(null); // 'succeeded' hoặc 'failed'
  const { search } = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Gửi toàn bộ query string từ VNPay về backend để kiểm tra chữ ký và cập nhật DB
        const { data } = await axios.get(`http://localhost:5000/api/order/vnpay-return${search}`, {
          withCredentials: true
        });

        if (data.code === '00') {
          setMessage('succeeded');
          localStorage.removeItem('orderId');
        } else {
          setMessage('failed');
        }
      } catch (error) {
        console.error("Lỗi xác thực VNPay:", error);
        setMessage('failed');
      } finally {
        setLoader(false);
      }
    };

    if (search) {
      verifyPayment();
    } else {
      setLoader(false);
      setMessage('failed');
    }
  }, [search]);

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4 bg-slate-50'>
      {loader ? (
        <FadeLoader color='#059473' />
      ) : message === 'succeeded' ? (
        <div className='flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-sm animate-in fade-in zoom-in duration-300'>
          <img className='w-24 h-24 object-contain' src='/images/success.png' alt="success" />
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-[#059473] mb-2'>Thanh toán thành công!</h2>
            <p className='text-slate-500 mb-6'>Cảm ơn bạn đã tin tưởng mua sắm. Đơn hàng của bạn đang được xử lý.</p>
          </div>
          <Link className='px-8 py-3 bg-[#059473] hover:bg-[#047d61] transition-all rounded-lg text-white font-bold shadow-lg shadow-green-100' to="/dashboard/my-orders">Quay lại trang đơn hàng</Link>
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-sm'>
          <img className='w-24 h-24 object-contain' src='/images/error.png' alt="error" />
          <div className='text-center'>
            <h2 className='text-2xl font-bold text-slate-800 mb-2'>Thanh toán thất bại!</h2>
            <p className='text-slate-500 mb-6'>Giao dịch không thành công hoặc đã bị hủy.</p>
          </div>
          <Link className='px-8 py-3 bg-red-500 hover:bg-red-600 transition-all rounded-lg text-white font-bold shadow-lg shadow-red-100' to="/dashboard/my-orders">Quay lại trang đơn hàng</Link>
        </div>
      )}
    </div>
  );
};

export default VnpayConfirm;