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
    logoutUser: (state, actions) => {
      return {
        ...initialState,
      };
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
