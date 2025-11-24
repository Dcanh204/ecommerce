import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from 'jwt-decode';


export const customer_register = createAsyncThunk(
  'auth/customer_register',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-register', info);
      localStorage.setItem('accessToken', data.token)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const customer_login = createAsyncThunk(
  'auth/customer_login',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/customer/customer-login', info);
      localStorage.setItem('accessToken', data.token)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const decoded = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo
  } else {
    return '';
  }
}


const authReducer = createSlice({
  name: 'auth',
  initialState: {
    successMessage: '',
    errorMessage: '',
    loading: false,
    userInfo: decoded(localStorage.getItem('accessToken'))
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_register.pending, (state) => {
        state.loading = true;
      })
      .addCase(customer_register.fulfilled, (state, action) => {
        const userInfo = decoded(localStorage.getItem('accessToken'))
        state.loading = false;
        state.successMessage = action.payload?.message
        state.userInfo = userInfo;
      })
      .addCase(customer_register.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload?.message
      })

      .addCase(customer_login.pending, (state) => {
        state.loading = true;
      })
      .addCase(customer_login.fulfilled, (state, action) => {
        const userInfo = decoded(localStorage.getItem('accessToken'))
        state.loading = false;
        state.successMessage = action.payload?.message
        state.userInfo = userInfo
      })
      .addCase(customer_login.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload?.message
      })

  }
})

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
