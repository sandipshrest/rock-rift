import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/reducerSlice/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
