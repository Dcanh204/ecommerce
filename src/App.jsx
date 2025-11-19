import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shops' element={<Shop />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Shipping />} />


      </Routes>
    </BrowserRouter>
  );
};

export default App;