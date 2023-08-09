import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./features/customer/customerSlice";
import authReducer from "./features/auth/authSlice";
import codeMangeReducer from "./features/codeMange/codeMangeSlice";

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    auth: authReducer,
    code: codeMangeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
