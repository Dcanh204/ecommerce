import React from 'react';
import categoryReducer from './reducers/categoryReducers';
import productReducer from './reducers/productReducers';

const rootReducers = {
  category: categoryReducer,
  product: productReducer,
}

export default rootReducers;