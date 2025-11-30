import React from 'react';
import categoryReducer from './reducers/categoryReducers';
import productReducer from './reducers/productReducers';
import authReducer from './reducers/authReducers';
import cartReducer from './reducers/cartReducers';
import orderReducer from './reducers/orderReducers';
import dashboardReducer from './reducers/dashboardReducer';
const rootReducers = {
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
}

export default rootReducers;