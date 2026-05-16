import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Stripe = ({ orderId, totalPrice }) => {
  const [loader, setLoader] = useState(false);

  const [clientSecret, setClientSecret] = useState('');
  const apperance = {
    theme: 'stripe'
  }

  const option = {
    clientSecret,
    appearance: apperance
  }
  console.log(totalPrice)
  const create_payment = async () => {
    try {
      setLoader(true)
      const { data } = await axios.post('http://localhost:5000/api/order/create-payment', { totalPrice }, { withCredentials: true })
      setClientSecret(data.clientSecret)
      setLoader(false)
    } catch (error) {
      console.log(error.response.data)
      setLoader(false)
    }
  }

  return (
    <div className='mt-2'>
      {
        clientSecret ? (
          <div className='p-4 bg-slate-50 rounded-xl border border-slate-200'>
            <Elements stripe={stripePromise} options={option}>
              <CheckoutForm orderId={orderId} />
            </Elements>
          </div>
        ) : (
          <button disabled={loader} onClick={create_payment} className='w-full py-3.5 rounded-xl bg-[#059473] hover:bg-[#047d61] shadow-lg shadow-green-100 transition-all cursor-pointer text-white font-bold uppercase flex justify-center items-center gap-2 text-sm'>
            {
              loader
                ? <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div>
                : "Thanh toán qua Stripe"
            }
          </button>
        )
      }
    </div>
  );
};

export default Stripe;