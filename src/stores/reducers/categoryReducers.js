import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from './../../api/api';

export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/home/categories');
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

const categoryReducer = createSlice({
  name: 'category',
  initialState: {
    categories: []
  },
  extraReducers: builder => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload?.categories;
      })

  }
})

export default categoryReducer.reducer;