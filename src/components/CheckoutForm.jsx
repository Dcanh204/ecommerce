import React, { useState } from 'react';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CheckoutForm = ({ orderId }) => {

  localStorage.setItem('orderId', orderId)
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const paymentElementOptions = {
    loyout: 'tabs'
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsLoading(true)
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/order/confirm'
      }
    })
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message)
    } else {
      setMessage('An unexpected error occured.')
    }
    setIsLoading(false)
  }
  return (
    <form onSubmit={submit} id='payment-form'>
      <div className='mb-6 space-y-4'>
        <LinkAuthenticationElement id='link-authentication-element' />
        <PaymentElement id='payment-element' options={paymentElementOptions} />
      </div>

      <button disabled={isLoading || !stripe || !elements} id='submit' className='w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all cursor-pointer text-white font-bold disabled:bg-slate-400'>
        <span id='button-text' className='flex justify-center items-center gap-2'>
          {
            isLoading ? <div className='animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full'></div> : "Xác nhận thanh toán"
          }
        </span>
      </button>
      {message && <div className='mt-4 text-red-500 text-sm text-center font-medium'>{message}</div>}
    </form>
  );
}




export default CheckoutForm;