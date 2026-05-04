import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { get_order_details } from '../../stores/reducers/orderReducers';
import { translateDeliveryStatus, translatePaymentStatus } from './../../utils/TranslateStatus';
import Skeleton from '../../pages/Skelator';

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { myOrder, loading } = useSelector(state => state.order);
  useEffect(() => {
    dispatch(get_order_details(orderId))
  }, [dispatch, orderId]);
  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }
  return (
    <div className='bg-white p-5 rounded-md'>
      {
        loading ? (
          <>
            <Skeleton className="w-[200px] h-4 mb-2" />
            <Skeleton className="w-[150px] h-3 mb-4" />
          </>
        )
          :
          <>

            <h2 className='text-slate-600 mb-1'>Mã đơn hàng: MDH - {myOrder._id?.slice(-6).toUpperCase()}</h2>
            <p className='text-sm mb-2'>Ngày đặt: {new Date(myOrder.date).toLocaleDateString('vi-VN')}</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <div className='flex flex-col gap-3'>
                <h2 className='font-sans text-sm'>Người nhận: {myOrder.shippingInfo?.name}</h2>
                <p className='text-sm'>Địa chỉ: {myOrder.shippingInfo?.ward} - {myOrder.shippingInfo?.district} - {myOrder.shippingInfo?.province}</p>
              </div>
              <div className='flex flex-col gap-3'>
                <h2 className='text-sm'>Giá: {formatPrice(myOrder.price)}</h2>
                <p className='text-sm'> Trạng thái thanh toán: <span className={`py-1 text-xs px-2 ${myOrder.payment_status === 'paid' ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'} rounded-md`}>{translatePaymentStatus(myOrder.payment_status)}</span></p>
                <p className='text-sm'> Trạng thái đơn hàng: <span className={`py-1 text-xs px-2 ${myOrder.delivery_status === 'delivered' ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'} rounded-md`}>{translateDeliveryStatus(myOrder.delivery_status)}</span></p>
              </div>
            </div>

            <div className='mt-4'>
              <h2 className='text-lg font-medium pb-2'>Đơn hàng</h2>
              <div className='flex flex-col gap-5'>
                {
                  myOrder?.products?.map((item, index) => <div key={index}>
                    <div className='flex flex-col justify-start items-start '>
                      <div className='flex gap-2'>
                        <img className='w-[55px] h-[55px]' src={item.images[0]} alt="" />
                        <div className='flex flex-col gap-0.5 justify-start items-start text-xs'>
                          <Link>{item.name}</Link>
                          <span>Thương hiệu: {item.brand}</span>
                          <p className='flex gap-5'>
                            <span>Số lượng: {item.quantity}</span>
                            <span className='text-red-500 font-medium'>Giá: {formatPrice(item.price - (item.price * item.discount) / 100)}</span>
                          </p>

                        </div>
                      </div>
                    </div>
                  </div>)
                }
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default OrderDetails;