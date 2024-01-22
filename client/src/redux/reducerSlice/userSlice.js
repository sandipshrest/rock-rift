// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userName: "Ram",
  age: 0,
};

// Redux Toolkit slice
export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.age += 1;
    },
  },
});
export const { increment } = userSlice.actions;
export default userSlice.reducer;
