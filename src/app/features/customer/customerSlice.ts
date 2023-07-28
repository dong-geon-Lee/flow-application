import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCustomerData } from "api";
import * as T from "@types";

const initialState: T.CustomerState = {
  cusLists: [],
  editMode: false,
  errorMessage: "",
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addCustomer(state, action) {
      state.cusLists.push(action.payload);
    },
    deleteCustomer(state, action) {
      state.cusLists = action.payload;
    },
    editCustomer(state, action) {
      state.cusLists = action.payload;
      state.editMode = false;
    },
    customerEditMode(state, action) {
      state.cusLists = action.payload;
      state.editMode = true;
    },
    customerEditExit(state, action) {
      state.cusLists = action.payload;
      state.editMode = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCustomerData.fulfilled,
        (state: any, action: PayloadAction) => {
          state.cusLists = action.payload;
        }
      )
      .addCase(
        fetchCustomerData.rejected,
        (state: any, action: PayloadAction) => {
          state.errorMessage = action.payload;
        }
      );
  },
});

export const {
  addCustomer,
  deleteCustomer,
  editCustomer,
  customerEditMode,
  customerEditExit,
} = customerSlice.actions;

export default customerSlice.reducer;
