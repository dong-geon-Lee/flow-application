import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  codeList: [],
  subCodeList: [],
  resultLists: [],
  selectedGroupCode: {},
  selectedSubCode: {},
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
    selectSingleSubCode(state, action) {
      state.selectedSubCode = action.payload;
    },
  },
});

export const {
  getCodeList,
  getSubCodeList,
  getResultsList,
  selectSingleCodeList,
  selectSingleSubCode,
} = codeMangeSlice.actions;

export default codeMangeSlice.reducer;
