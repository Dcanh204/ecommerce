import React from 'react';
import { BsCartXFill } from 'react-icons/bs';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { FaCartFlatbedSuitcase } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 h-[47px] w-[47px] rounded-full flex justify-center items-center'>
            <span className='text-lg text-green-800'><FaShoppingCart /></span>
          </div>
          <div className='flex flex-col justify-start items-center text-slate-600'>
            <h2 className='text-lg font-bold'>45</h2>
            <span>Đơn hàng</span>
          </div>
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 h-[47px] w-[47px] rounded-full flex justify-center items-center'>
            <span className='text-lg text-green-800'><FaCartFlatbedSuitcase /></span>
          </div>
          <div className='flex flex-col justify-start items-center text-slate-600'>
            <h2 className='text-lg font-bold'>15</h2>
            <span>Đơn hàng chờ xử lý</span>
          </div>
        </div>

        <div className='flex justify-center items-center p-5 bg-white rounded-md gap-5'>
          <div className='bg-green-100 h-[47px] w-[47px] rounded-full flex justify-center items-center'>
            <span className='text-lg text-green-800'><BsCartXFill /></span>
          </div>
          <div className='flex flex-col justify-start items-center text-slate-600'>
            <h2 className='text-lg font-bold'>2</h2>
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
    </div>
  );
};

export default Index;