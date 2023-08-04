import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAuthUserList } from "api";
import * as T from "@types";

const orderedUsers = JSON.parse(localStorage.getItem("users") || "[]");
const orderedUserInfo = JSON.parse(localStorage.getItem("singleUser") || "[]");

const initialState: any = {
  userLists: orderedUsers ? orderedUsers : [],
  userInfo: orderedUserInfo ? orderedUserInfo : [],
  message: "",
  token: localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state, action) {
      state.userInfo = [];
      state.message = action.payload;
    },
    authUserLogin(state, action) {
      state.userInfo = action.payload;
      state.token = localStorage.getItem("authToken");
    },
    refreshUserLists(state, action) {
      state.userLists = action.payload;
      state.token = localStorage.getItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAuthUserList.fulfilled,
      (state: any, action: PayloadAction) => {
        state.userLists = action.payload;
      }
    );
  },
});

export const { logout, authUserLogin, refreshUserLists } = authSlice.actions;

export default authSlice.reducer;
