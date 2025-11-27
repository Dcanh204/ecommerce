import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const place_order = createAsyncThunk(
  'cart/place_order',
  async (orderInfo, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/order', orderInfo);
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

  }
})

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
