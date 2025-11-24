import React from 'react';
import categoryReducer from './reducers/categoryReducers';
import productReducer from './reducers/productReducers';
import authReducer from './reducers/authReducers';
const rootReducers = {
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
}

export default rootReducers;