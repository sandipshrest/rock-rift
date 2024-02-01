import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
