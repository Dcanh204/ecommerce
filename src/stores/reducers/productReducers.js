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

export const product_details = createAsyncThunk(
  'product/product_details',
  async (slug, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/products/${slug}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const customer_review = createAsyncThunk(
  'review/customer_review',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/home/products/reviews`, info);
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
    product: {},
    relatedProducts: [],
    fromStore: [],
    reviews: [],
    totalReviw: 0,
    rating_review: [],
    successMessage: ''
  },
  reducers: {
    messageClear: (state) => {
      state.successMessage = "";
    }
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
      .addCase(product_details.fulfilled, (state, action) => {
        state.product = action.payload?.product;
        state.relatedProducts = action.payload?.relatedProducts;
        state.fromStore = action.payload?.fromStore;
      })
      .addCase(customer_review.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      })


  }
})
export const { messageClear } = productReducer.actions;
export default productReducer.reducer;