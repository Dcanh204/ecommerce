import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectRoute = () => {
  const { userInfo } = useSelector(state => state.auth);
  const navigation = useNavigate();
  if (userInfo) {
    return <Outlet />
  } else {
    return navigation('/login')
  }
};

export default ProtectRoute;