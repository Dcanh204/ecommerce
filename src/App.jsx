import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { getCategory } from './stores/reducers/categoryReducers';
import CategoryShop from './pages/CategoryShop';
import SearchProduct from './pages/SearchProduct';
import NotFound from './pages/NotFound';
import Payment from './pages/payment';
import ProtectRoute from './utils/ProtectRoute';
import Dashboard from './pages/Dashboard';
import Index from './components/dashboard';
import Order from './components/dashboard/Order';
import ChangePassword from './components/dashboard/ChangePassword';
import WishList from './components/dashboard/WishList';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shops' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/product/details/:slug' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/category/:slug' element={<CategoryShop />} />
        <Route path='/search' element={<SearchProduct />} />
        <Route path='/register' element={<Register />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/dashboard' element={<ProtectRoute />}>
          <Route element={<Dashboard />} >
            <Route index element={<Index />} />
            <Route path='my-orders' element={<Order />} />
            <Route path='change-password' element={<ChangePassword />} />
            <Route path='my-wishlist' element={<WishList />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />



      </Routes>
    </BrowserRouter>
  );
};

export default App;