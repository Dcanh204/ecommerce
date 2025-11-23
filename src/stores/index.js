import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducers";

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: true
    })
  },
  devTools: true
})

export default store;