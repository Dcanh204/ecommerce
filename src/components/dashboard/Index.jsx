import React, { useEffect } from 'react';
import { BsCartXFill } from 'react-icons/bs';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { FaCartFlatbedSuitcase } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { get_dashboard_data } from '../../stores/reducers/dashboardReducer';
import { translateDeliveryStatus, translatePaymentStatus } from './../../utils/TranslateStatus';

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth)
  const { recentOrders, totalOrder, totalPendingOrder, totalCancelledOrder } = useSelector(state => state.dashboard);
  useEffect(() => {
    dispatch(get_dashboard_data(userInfo.id))
  }, [dispatch, userInfo])

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
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 h-[47px] w-[47px] rounded-full flex justify-center items-center'>
            <span className='text-lg text-green-800'><FaShoppingCart /></span>
          </div>
          <div className='flex flex-col justify-start items-center text-slate-600'>
            <h2 className='text-lg font-bold'>{totalOrder}</h2>
            <span>Đơn hàng</span>
          </div>
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 h-[47px] w-[47px] rounded-full flex justify-center items-center'>
            <span className='text-lg text-green-800'><FaCartFlatbedSuitcase /></span>
          </div>
          <div className='flex flex-col justify-start items-center text-slate-600'>
            <h2 className='text-lg font-bold'>{totalPendingOrder}</h2>
            <span>Đơn hàng chờ xử lý</span>
          </div>
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 h-[47px] w-[47px] rounded-full flex justify-center items-center'>
            <span className='text-lg text-green-800'><BsCartXFill /></span>
          </div>
          <div className='flex flex-col justify-start items-center text-slate-600'>
            <h2 className='text-lg font-bold'>{totalCancelledOrder}</h2>
            <span>Đơn hàng đã hủy</span>
          </div>
        </div>

      </div>

      <div className='bg-white p-5 rounded-md mt-5'>
        <h2 className='text-base font-medium'>Đơn hàng gần đây</h2>
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
                recentOrders.map((item, i) => <tr key={i} className='border-b border-[#e1e8f0]'>
                  <td className='px-6 py-4 whitespace-nowrap'> MDH - {item._id?.slice(-6).toUpperCase()}</td>
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
                </tr>)
              }

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;