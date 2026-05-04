import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = () => {
  const { userInfo } = useSelector(state => state.auth);
  if (userInfo) {
    return <Outlet />
  } else {
    return <Navigate to='/login' replace />
  }
};

export default ProtectRoute;