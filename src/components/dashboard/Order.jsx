import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Order = () => {
  const [statusOrder, setStatusOrder] = useState('all');
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
            <tr className='border-b border-[#e1e8f0]'>
              <td className='px-6 py-4 whitespace-nowrap'>#312</td>
              <td className='px-6 py-4 whitespace-nowrap'>2.000.000đ</td>
              <td className='px-6 py-4 whitespace-nowrap'>Chưa thanh toán</td>
              <td className='px-6 py-4 whitespace-nowrap'>Chờ xử lý</td>
              <td className='px-6 py-4 whitespace-nowrap flex items-center gap-3'>
                <Link>
                  <span className='bg-green-200 text-green-800 h-6 px-2 inline-flex justify-center items-center rounded-md'><FaEye /></span>
                </Link>
                <Link>
                  <span className='bg-green-200 text-green-800 h-6 px-2 inline-flex justify-center items-center rounded-md'>Thanh toán</span>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;