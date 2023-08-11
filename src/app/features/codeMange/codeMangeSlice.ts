import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  codeList: [],
  subCodeList: [],
  resultLists: [],
  selectedGroupCode: {},
};

export const codeMangeSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCodeList(state, action) {
      state.codeList = action.payload;
    },
    getSubCodeList(state, action) {
      state.subCodeList = action.payload;
    },
    getResultsList(state, action) {
      state.resultLists = action.payload;
    },
    selectSingleCodeList(state, action) {
      state.selectedGroupCode = action.payload;
    },
  },
});

export const {
  getCodeList,
  getSubCodeList,
  getResultsList,
  selectSingleCodeList,
} = codeMangeSlice.actions;

export default codeMangeSlice.reducer;
