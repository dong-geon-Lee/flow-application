import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getAuthUserList } from "api";
import * as T from "@types";

const initialState: any = {
  userLists: [],
  userInfo: [],
  message: "",
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
    },
    refreshUserLists(state, action) {
      state.userLists = action.payload;
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
