import React from 'react';
import categoryReducer from './reducers/categoryReducers';
import productReducer from './reducers/productReducers';
import authReducer from './reducers/authReducers';
import cartReducer from './reducers/cartReducers';
import orderReducer from './reducers/orderReducers';
const rootReducers = {
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
}

export default rootReducers;