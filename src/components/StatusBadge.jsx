import React from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineClockCircle, AiOutlineSync } from 'react-icons/ai';
import { MdLocalShipping, MdDoneAll, MdCancel } from 'react-icons/md';
import { translateDeliveryStatus, translatePaymentStatus } from '../utils/TranslateStatus';

const statusStyles = {
  payment: {
    paid: { css: 'bg-green-100 text-green-700 border-green-200', icon: <AiFillCheckCircle /> },
    unpaid: { css: 'bg-red-100 text-red-700 border-red-200', icon: <AiFillCloseCircle /> },
  },
  delivery: {
    pending: { css: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: <AiOutlineClockCircle /> },
    processing: { css: 'bg-blue-100 text-blue-700 border-blue-200', icon: <AiOutlineSync className='animate-spin' /> },
    shipped: { css: 'bg-indigo-100 text-indigo-700 border-indigo-200', icon: <MdLocalShipping /> },
    delivered: { css: 'bg-green-100 text-green-700 border-green-200', icon: <MdDoneAll /> },
    cancelled: { css: 'bg-slate-100 text-slate-700 border-slate-200', icon: <MdCancel /> },
  }
};

const StatusBadge = ({ type, status }) => {
  const style = statusStyles[type]?.[status];

  if (!style) return null;

  const label = type === 'payment'
    ? translatePaymentStatus(status)
    : translateDeliveryStatus(status);

  return (
    <span className={`px-2 py-1 rounded-full border text-[10px] font-medium flex items-center gap-1 w-fit  ${style.css}`}>
      {style.icon}
      {label}
    </span>
  );
};

export default StatusBadge;
