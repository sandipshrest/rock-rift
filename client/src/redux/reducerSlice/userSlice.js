// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLogin: false,
  token: "",
  userDetail: {},
};

// Redux Toolkit slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, actions) => {
      return {
        ...state,
        isLogin: true,
        token: actions.payload.token,
        userDetail: actions.payload.userDetail,
      };
    },
  },
});
export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
