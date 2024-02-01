import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addWishlist: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { addWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
