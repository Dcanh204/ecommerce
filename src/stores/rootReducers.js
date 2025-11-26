import React from 'react';
import categoryReducer from './reducers/categoryReducers';
import productReducer from './reducers/productReducers';
import authReducer from './reducers/authReducers';
import cartReducer from './reducers/cartReducers';
const rootReducers = {
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer
}

export default rootReducers;