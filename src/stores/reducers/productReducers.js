import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from './../../api/api';

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/home/products');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


export const query_products = createAsyncThunk(
  'product/query_products',
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/home/query-products', { params: query });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const productReducer = createSlice({
  name: 'product',
  initialState: {
    products: [],
    products_shop: [],
    latest_product: [],
    topRate_product: [],
    discount_product: [],
    totalProduct: 0,
    parPage: 3,
  },
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload?.products;
        state.latest_product = action.payload?.latest_product;
        state.topRate_product = action.payload?.topRate_product;
        state.discount_product = action.payload?.discount_product;
      })
      .addCase(query_products.fulfilled, (state, action) => {
        state.products_shop = action.payload?.products;
        state.totalProduct = action.payload?.totalProduct;
        state.parPage = action.payload?.parPage;
      })



  }
})

export default productReducer.reducer;