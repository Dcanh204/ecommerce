import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_to_cart = createAsyncThunk(
  'cart/add_to_cart',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/cart', info);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const get_cart_product = createAsyncThunk(
  'cart/get_cart_product',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/cart/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const delete_cart_product = createAsyncThunk(
  'cart/delete_cart_product',
  async (cartId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/cart/${cartId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const quantity_inc = createAsyncThunk(
  'cart/quantity_inc',
  async (cartId, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/cart/quantity-inc/${cartId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const quantity_dec = createAsyncThunk(
  'cart/quantity_dec',
  async (cartId, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/cart/quantity-dec/${cartId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    wishlist_products: [],
    wishlist_product_count: 0,
    shipping_fee: 0,
    price: 0,
    outOfStockProduct: [],
    successMessage: '',
    errorMessage: '',
    buy_product_item: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_cart.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
        state.cart_product_count = state.cart_product_count + 1;
      })
      .addCase(add_to_cart.rejected, (state, action) => {
        state.errorMessage = action.payload?.message;
      })
      .addCase(get_cart_product.fulfilled, (state, action) => {
        state.cart_products = action.payload?.cart_products;
        state.shipping_fee = action.payload?.shipping_fee;
        state.price = action.payload?.price;
        state.outOfStockProduct = action.payload?.outOfStockProduct;
        state.cart_product_count = action.payload?.cart_product_count;
        state.buy_product_item = action.payload?.buy_product_item;
      })

      .addCase(delete_cart_product.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      })
      .addCase(quantity_inc.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      })
      .addCase(quantity_dec.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
      })
  }
})

export const { messageClear } = cartReducer.actions;
export default cartReducer.reducer;
