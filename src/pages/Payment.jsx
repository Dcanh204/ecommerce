import React, { useState, useEffect } from 'react';
import Header from './../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import Stripe from '../components/Stripe';
import axios from 'axios';

const Payment = () => {

  const { items, totalPrice, orderId, orderDate } = useLocation().state || { items: 0, totalPrice: 0, orderId: '', orderDate: new Date().toISOString() };
  const [paymentMethod, setPaymentMethod] = useState('stripe')
  const [vnpayLoader, setVnpayLoader] = useState(false)
  const [timeLeft, setTimeLeft] = useState('');
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const expiry = new Date(orderDate).getTime() + 15 * 60 * 1000;
      const diff = expiry - Date.now();

      if (diff <= 0) {
        setTimeLeft('00:00');
        setIsExpired(true);
        clearInterval(interval);
      } else {
        const m = Math.floor(diff / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${m}:${s < 10 ? '0' : ''}${s}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [orderDate]);

  const handleVnpayPayment = async () => {
    try {
      setVnpayLoader(true)
      const { data } = await axios.post('http://localhost:5000/api/order/vnpay-payment', { totalPrice, orderId }, { withCredentials: true });
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      setVnpayLoader(false)
    }
  }

  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <Header />
      <section className='pt-42 pb-12'>
        <div className='w-[95%] lg:w-[85%] mx-auto'>
          {/* Countdown Timer Banner */}
          <div className={`mb-6 p-4 rounded-xl flex items-center justify-between border ${isExpired ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200 animate-pulse'}`}>
            <div className='flex items-center gap-3'>
              <span className='text-2xl'>⏰</span>
              <div>
                <p className={`font-bold ${isExpired ? 'text-red-600' : 'text-orange-700'}`}>
                  {isExpired ? 'Đơn hàng đã hết hạn thanh toán!' : 'Thời gian hoàn tất thanh toán còn lại'}
                </p>
                <p className='text-xs text-slate-500 font-medium'>Vui lòng thanh toán trước khi thời gian kết thúc để tránh đơn hàng bị hủy tự động.</p>
              </div>
            </div>
            <div className={`text-3xl font-mono font-bold ${isExpired ? 'text-red-600' : 'text-orange-600'}`}>
              {timeLeft}
            </div>
          </div>

          <div className='flex flex-wrap md:flex-nowrap gap-8'>

            {/* Cột trái: Phương thức thanh toán */}
            <div className='w-full md:w-7/12'>
              <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-100'>
                <h2 className='text-xl font-bold text-slate-700 mb-6'>Phương thức thanh toán</h2>
                <div className='flex flex-wrap gap-4 mb-8'>
                  <div
                    onClick={() => setPaymentMethod('stripe')}
                    className={`flex-1 min-w-[140px] cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 
                    ${paymentMethod === 'stripe' ? 'border-[#059473] bg-green-50/50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                  >
                    <img className='w-12 h-12 object-contain' src="/images/payment/stripe.png" alt="Stripe" />
                    <span className='font-semibold text-slate-700'>Stripe</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('vnpay')}
                    className={`flex-1 min-w-[140px] cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 
                    ${paymentMethod === 'vnpay' ? 'border-[#059473] bg-green-50/50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                  >
                    <img className='w-12 h-12 object-contain' src="/images/payment/vnpay.png" alt="VNPAY" />
                    <span className='font-semibold text-slate-700'>VNPAY</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex-1 min-w-[140px] cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 
                    ${paymentMethod === 'cod' ? 'border-[#059473] bg-green-50/50' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                  >
                    <img className='w-12 h-12 object-contain rounded-lg' src="/images/payment/cod.jpg" alt="COD" />
                    <span className='font-semibold text-slate-700'>Tiền mặt (COD)</span>
                  </div>
                </div>

                {paymentMethod === 'stripe' && (
                  <div className='mt-4 animate-slide-up'>
                    {isExpired ? <div className='text-center py-4 text-red-500 font-bold uppercase'>Thanh toán đã đóng</div> : <Stripe orderId={orderId} items={items} totalPrice={totalPrice} />}
                  </div>
                )}

                {paymentMethod === 'vnpay' && (
                  <div className='mt-4 animate-slide-up'>
                    <button disabled={vnpayLoader || isExpired} onClick={handleVnpayPayment} className={`w-full py-3.5 rounded-xl transition-all font-bold uppercase flex justify-center items-center gap-2 ${isExpired ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-[#059473] hover:bg-[#047d61] shadow-lg shadow-green-100 cursor-pointer text-white'}`}>
                      {
                        vnpayLoader
                          ? <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full text-sm'></div>
                          : "Thanh toán qua VNPAY"
                      }
                    </button>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className='mt-4 animate-slide-up'>
                    <button disabled={isExpired} className={`w-full py-3.5 rounded-xl transition-all font-bold uppercase text-sm ${isExpired ? 'bg-slate-300 cursor-not-allowed text-slate-500' : 'bg-[#059473] hover:bg-[#047d61] shadow-lg shadow-green-100 cursor-pointer text-white'}`}>
                      Xác nhận đặt hàng (COD)
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Cột phải: Tóm tắt đơn hàng */}
            <div className='w-full md:w-5/12'>
              <div className='bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-36'>
                <h2 className='text-lg font-bold text-slate-700 mb-4 pb-2 border-b'>Tóm tắt đơn hàng</h2>
                <div className='flex justify-between items-center mb-3 text-slate-600'>
                  <span>Số lượng sản phẩm:</span>
                  <span className='font-medium'>{items}</span>
                </div>
                <div className='flex justify-between items-center pt-4 border-t mt-4'>
                  <span className='text-lg font-bold text-slate-700'>Tổng thanh toán:</span>
                  <span className='text-xl font-bold text-red-600'>{formatPrice(totalPrice)}</span>
                </div>
                <p className='text-xs text-slate-400 mt-6 text-center italic'>Vui lòng kiểm tra lại thông tin trước khi xác nhận thanh toán.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;