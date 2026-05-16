
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const load = async () => {
  return await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
}

const ConfirmOrder = () => {

  const [loader, setLoader] = useState(true)
  const [stripe, setStripe] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (!stripe) {
      return
    }
    const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
    if (!clientSecret) {
      return
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage('succeeded')
          break
        case "processing":
          setMessage('processing')
          break
        case "requires_payment_method":
          setMessage('failed')
          break
        default:
          setMessage('failed')

      }
    })
  }, [stripe])

  const get_load = async () => {
    const tempStripe = await load()
    setStripe(tempStripe)
  }

  useEffect(() => {
    get_load()
  }, [])

  const update_payment = async () => {
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
      try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`, { withCredentials: true })
        localStorage.removeItem('orderId')
        setLoader(false)
      } catch (error) {
        console.log(error.response.data)
        setLoader(false)
      }
    }
  }

  useEffect(() => {
    const initConfirm = async () => {
      const params = new URLSearchParams(window.location.search);
      const vnp_ResponseCode = params.get('vnp_ResponseCode');
      const paymentIntentClientSecret = params.get('payment_intent_client_secret');

      if (vnp_ResponseCode) {
        // Xử lý VNPay
        try {
          const { data } = await axios.get(`http://localhost:5000/api/order/vnpay-return${window.location.search}`, { withCredentials: true });
          if (data.code === '00') {
            setMessage('succeeded');
            localStorage.removeItem('orderId');
          } else {
            setMessage('failed');
          }
        } catch (error) {
          setMessage('failed');
          console.log(error)
        }
        setLoader(false);
      } else if (paymentIntentClientSecret) {
        // Xử lý Stripe: Logic cập nhật DB đã nằm trong useEffect [stripe] gọi update_payment
        if (message === 'succeeded') {
          update_payment();
        }
      } else {
        // Trường hợp không có param nào (ví dụ reload trang hoặc COD)
        const orderId = localStorage.getItem('orderId');
        if (orderId) update_payment();
        else setLoader(false);
      }
    };

    initConfirm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, stripe, window.location.search]);

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4 bg-slate-50'>
      {
        (message === 'failed' || message === 'processing') ? (
          <div className='flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-sm'>
            <img className='w-24 h-24 object-contain' src='/images/error.png' alt="error" />
            <div className='text-center'>
              <h2 className='text-2xl font-bold text-slate-800 mb-2'>
                {message === 'processing' ? 'Đang xử lý giao dịch...' : 'Thanh toán thất bại!'}
              </h2>
              <p className='text-slate-500 mb-6'>Vui lòng kiểm tra lại lịch sử đơn hàng hoặc thử lại sau.</p>
            </div>
            <Link className='px-8 py-3 bg-[#059473] hover:bg-[#047d61] transition-all rounded-lg text-white font-bold shadow-lg shadow-green-100' to="/dashboard/my-orders">Quay lại trang đơn hàng </Link>
          </div>
        ) : message === 'succeeded' ? (
          loader ? <FadeLoader color='#059473' /> : (
            <div className='flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-sm animate-in fade-in zoom-in duration-300'>
              <img className='w-24 h-24 object-contain' src='/images/success.png' alt="success" />
              <div className='text-center'>
                <h2 className='text-2xl font-bold text-[#059473] mb-2'>Thanh toán thành công!</h2>
                <p className='text-slate-500 mb-6'>Cảm ơn bạn đã tin tưởng mua sắm. Đơn hàng của bạn đang được hệ thống xử lý.</p>
              </div>
              <Link className='px-8 py-3 bg-[#059473] hover:bg-[#047d61] transition-all rounded-lg text-white font-bold shadow-lg shadow-green-100' to="/dashboard/my-orders">Quay lại trang đơn hàng </Link>
            </div>
          )
        ) : <FadeLoader color='#059473' />
      }
    </div>
  );
};

export default ConfirmOrder;