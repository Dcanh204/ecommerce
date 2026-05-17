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

export const add_to_wishlist = createAsyncThunk(
  'wishlist/add_to_wishlist',
  async (productInfo, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/cart/add-to-wishlist`, productInfo);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const get_wishlist_products = createAsyncThunk(
  'wishlist/get_wishlist_products',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/cart/get-wishlist-products/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const remove_wishlist = createAsyncThunk(
  'wishlist/remove_wishlist',
  async (wishlistId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/cart/remove-wishlist-products/${wishlistId}`);
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
    loader: false,
    buy_product_item: 0,
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    reset_count: (state) => {
      state.cart_product_count = 0;
      state.wishlist_product_count = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(add_to_cart.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_to_cart.fulfilled, (state, action) => {
        state.loader = false;
        state.successMessage = action.payload?.message;
        state.cart_product_count = state.cart_product_count + 1;
      })
      .addCase(add_to_cart.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload?.message;
      })
      .addCase(get_cart_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_cart_product.fulfilled, (state, action) => {
        state.loader = false;
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

      .addCase(add_to_wishlist.rejected, (state, action) => {
        state.errorMessage = action.payload?.message;
      })

      .addCase(add_to_wishlist.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
        state.wishlist_product_count = state.wishlist_product_count > 0 ? state.wishlist_product_count + 1 : 1;
      })

      .addCase(get_wishlist_products.fulfilled, (state, action) => {
        state.wishlist_products = action.payload?.wishlist_products;
        state.wishlist_product_count = action.payload?.wishlistCount;
      })

      .addCase(remove_wishlist.fulfilled, (state, action) => {
        state.successMessage = action.payload?.message;
        state.wishlist_products = state.wishlist_products.filter(item => item._id !== action.payload?.wishlistId);
        state.wishlist_product_count = state.wishlist_product_count - 1;
      })
  }
})

export const { messageClear, reset_count } = cartReducer.actions;
export default cartReducer.reducer;
