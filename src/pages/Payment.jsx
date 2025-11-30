import React, { useState } from 'react';
import Header from './../components/Header';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import Stripe from '../components/Stripe';

const Payment = () => {

  const { items, totalPrice, orderId } = useLocation().state;
  const [paymentMethod, setPaymentMethod] = useState('stripe')

  return (
    <div>
      <Header />
      <section className='pt-35 pb-25 sm:pt-30 md:bg-[#eeeeee]'>
        <div className='w-[90%] mx-auto py-16 mt-4'>
          <div className='flex flex-col lg:flex-wrap'>
            <div className='w-full'>
              <div className='pr-0 md:pr-2'>
                <div className='flex flex-wrap'>
                  <div onClick={() => setPaymentMethod('stripe')} className={` cursor-pointer py-8 px-12 ${paymentMethod === 'stripe' ? 'bg-white' : 'bg-slate-100'}`}>
                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                      <img className='w-10 h-10' src="/images/payment/stripe.png" alt="" />
                      <span>Stripe</span>
                    </div>
                  </div>
                  <div onClick={() => setPaymentMethod('cod')} className={` cursor-pointer py-8 px-12 ${paymentMethod === 'cod' ? 'bg-white' : 'bg-slate-100'}`}>
                    <div className='flex flex-col gap-[3px] justify-center items-center'>
                      <img className='w-10 h-10' src="/images/payment/cod.jpg" alt="" />
                      <span>COD</span>
                    </div>
                  </div>
                </div>
              </div>
              {
                paymentMethod === 'stripe' && <div>
                  <Stripe />
                </div>
              }
              {
                paymentMethod === 'cod' && <div className='mt-5 '>
                  <button className='px-10 py-1.5 rounded-lg bg-[#059473] hover:bg-green-500/80 cursor-pointer text-white'>Đặt hàng</button>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;