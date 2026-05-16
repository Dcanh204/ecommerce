import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from './stores/reducers/categoryReducers';
import CategoryShop from './pages/CategoryShop';
import SearchProduct from './pages/SearchProduct';
import NotFound from './pages/NotFound';
import Payment from './pages/payment';
import ProtectRoute from './utils/ProtectRoute';
import Dashboard from './pages/Dashboard';
import Order from './components/dashboard/Order';
import ChangePassword from './components/dashboard/ChangePassword';
import WishList from './components/dashboard/WishList';
import OrderDetails from './components/dashboard/OrderDetails';
import ScrollToTop from './components/ScrollToTop';
import Chat from './components/dashboard/Chat';
import Index from './components/dashboard/Index';
import Chatbot from './components/chatbot/Chatbot';
import io from 'socket.io-client';
import { set_active_sellers } from './stores/reducers/chatReducers';
import ConfirmOrder from './pages/ConfirmOrder';

export const SocketContext = createContext();

const App = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector(state => state.auth)
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL);
      setSocket(newSocket);
      newSocket.emit('add_user', userInfo.id, userInfo);
      newSocket.on('activeSeller', (sellers) => {
        dispatch(set_active_sellers(sellers));
      });
      return () => {
        newSocket.disconnect();
        setSocket(null);
      }
    }
  }, [userInfo, dispatch])

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shops' element={<Shop />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/product/details/:slug' element={<ProductDetails />} />
          <Route path='/order/confirm?' element={<ConfirmOrder />} />
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
              <Route path='order/details/:orderId' element={<OrderDetails />} />
              <Route path='chat' element={<Chat />} />
              <Route path='chat/:sellerId' element={<Chat />} />
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </SocketContext.Provider>
  );
};

export default App;