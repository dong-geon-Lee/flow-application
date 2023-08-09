import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  codeList: [],
};

export const codeMangeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCodeList(state, action) {
      state.codeList = action.payload;
    },
  },
});

export const { getCodeList } = codeMangeSlice.actions;

export default codeMangeSlice.reducer;
