import { configureStore } from "@reduxjs/toolkit";

import adReducer from "./slices/adSlice";
import authReducer from "./slices/authSlice";
import chatReducer from "./slices/chatSlice";
import socketReducer from "./slices/socketSlice";

import { apiSlice } from "./slices/apiSlice";
import { rtkQueryErrorLogger } from "./slices/middleware";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    ad: adReducer,
    auth: authReducer,
    chat: chatReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryErrorLogger).concat(apiSlice.middleware),
  devTools: true,
});

export default store;
