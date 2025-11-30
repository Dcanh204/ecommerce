import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  'order/place_order',
  async (orderInfo, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/order', orderInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const get_orders = createAsyncThunk(
  'order/get_orders',
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`order?userId=${userId}&status=${status}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const get_order_details = createAsyncThunk(
  'order/get_orders',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/order/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)


const orderReducer = createSlice({
  name: 'order',
  initialState: {
    myOrders: [],
    successMessage: '',
    errorMessage: '',
    myOrder: {}
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_orders.fulfilled, (state, action) => {
        state.myOrders = action.payload?.orders
      })
  }
})

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
