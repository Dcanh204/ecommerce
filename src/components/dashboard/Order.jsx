import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_orders } from '../../stores/reducers/orderReducers';
import { translateDeliveryStatus, translatePaymentStatus } from '../../utils/TranslateStatus';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const { myOrders } = useSelector(state => state.order);
  const [statusOrder, setStatusOrder] = useState('all');
  useEffect(() => {
    dispatch(get_orders({ userId: userInfo.id, status: statusOrder }))
  }, [userInfo, dispatch, statusOrder])
  const formatPrice = (price) => {
    const rounded = Math.floor(price / 1000) * 1000;
    return new Intl.NumberFormat('vi-VN').format(rounded) + '₫';
  }
  const redirect_payment = (order) => {
    let items = order.products.reduce((sum, item) => sum + item.quantity, 0)
    navigate('/payment', {
      state: {
        price: order.price,
        orderId: order._id,
        items
      }
    })
  }
  return (
    <div className='bg-white p-4 rounded-md'>
      <div className='flex justify-between items-center'>
        <h2 className='text-base font-medium'>Đơn hàng</h2>
        <select className='text-xs outline-none px-3 py-1 border border-slate-300 rounded-md cursor-pointer' value={statusOrder} onChange={(e) => setStatusOrder(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="placed">Đã đặt</option>
          <option value="pending">Chờ xử lý</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>
      <div className='overflow-x-auto mt-4 rounded-md'>
        <table className='text-xs text-left w-full'>
          <thead className='uppercase text-slate-700 bg-slate-200'>
            <tr>
              <th className='px-6 py-2 whitespace-nowrap'>Mã đơn hàng</th>
              <th className='px-6 py-2 whitespace-nowrap'>Giá</th>
              <th className='px-6 py-2 whitespace-nowrap'>Trạng thái thanh toán</th>
              <th className='px-6 py-2 whitespace-nowrap'>Trạng thái đơn hàng</th>
              <th className='px-6 py-2 whitespace-nowrap'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {
              myOrders.map((item, i) => <tr key={i} className='border-b border-[#e1e8f0]'>
                <td className='px-6 py-4 whitespace-nowrap'>MDH - {item._id?.slice(-6).toUpperCase()}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{formatPrice(item.price)}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{translatePaymentStatus(item.payment_status)}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{translateDeliveryStatus(item.delivery_status)}</td>
                <td className='px-6 py-4 whitespace-nowrap flex items-center gap-3'>
                  <Link to={`/dashboard/order/details/${item._id}`}>
                    <span className='bg-green-200 text-green-800 h-6 px-2 inline-flex justify-center items-center rounded-md'><FaEye /></span>
                  </Link>
                  {
                    item.payment_status !== 'paid' && <span onClick={() => redirect_payment(item)} className='bg-green-200 text-green-800 h-6 px-2 inline-flex justify-center items-center rounded-md cursor-pointer'>Thanh toán</span>
                  }
                </td>
              </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;