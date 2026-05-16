import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const add_friend = createAsyncThunk(
  'chat/add_friend',
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/chat/customer/add-customer-friend', info)
      return data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const send_message = createAsyncThunk(
  'chat/send_message',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/chat/customer/send-message-to-seller', info)
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const get_friends = createAsyncThunk(
  'chat/get_friends',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-friends/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatReducer = createSlice({
  name: 'chat',
  initialState: {
    my_friends: [],
    messages: [],
    current_friend: "",
    successMessage: '',
    errorMessage: '',
    activeSellers: []
  },
  reducers: {
    messageClear: (state) => {
      state.errorMessage = '';
      state.successMessage = ''
    },
    updateMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },
    set_active_sellers: (state, action) => {
      state.activeSellers = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(add_friend.fulfilled, (state, action) => {
        state.messages = action?.payload.messages;
        state.my_friends = action?.payload.myFriends;
        state.current_friend = action?.payload.currentFriend
      })
      .addCase(send_message.fulfilled, (state, { payload }) => {
        let tempFriends = state.my_friends
        let index = tempFriends.findIndex(f => f.fdId === payload.message.receiverId)
        while (index > 0) {
          let temp = tempFriends[index]
          tempFriends[index] = tempFriends[index - 1]
          tempFriends[index - 1] = temp
          index--
        }
        state.my_friends = tempFriends;
        state.messages = [...state.messages, payload.message];
        state.successMessage = "Gửi tin nhắn thành công"
      })
      .addCase(get_friends.fulfilled, (state, action) => {
        state.my_friends = action.payload.myFriends;
      });


  }
})

export const { messageClear, updateMessage, set_active_sellers } = chatReducer.actions;
export default chatReducer.reducer;