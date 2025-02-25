import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import websiteReducer from "../features/websiteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    website: websiteReducer,
  },
});