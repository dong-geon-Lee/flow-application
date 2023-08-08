import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("authUser") || "{}");

const initialState: any = {
  authUser: currentUser ? currentUser : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.authUser = action.payload;
    },
    logout(state) {
      state.authUser = null;
    },
  },
});

export const { loginUser, logout } = authSlice.actions;

export default authSlice.reducer;
