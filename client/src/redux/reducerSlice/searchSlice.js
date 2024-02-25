import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: [],
  reducers: {
    addToSearchList: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { addToSearchList } = searchSlice.actions;
export default searchSlice.reducer;
