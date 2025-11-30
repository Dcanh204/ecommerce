import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_dashboard_data = createAsyncThunk(
  'dashboard/get_dashboard_data',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/order/dashboard/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)



const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    recentOrders: [],
    successMessage: '',
    errorMessage: '',
    totalOrder: 0,
    totalPendingOrder: 0,
    totalCancelledOrder: 0
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_dashboard_data.fulfilled, (state, action) => {
        state.recentOrders = action.payload?.recentOrders;
        state.totalOrder = action.payload?.totalOrder;
        state.totalPendingOrder = action.payload?.totalPendingOrder;
        state.totalCancelledOrder = action.payload?.totalCancelledOrder;
      })
  }
})

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
