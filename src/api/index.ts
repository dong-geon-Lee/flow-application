import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomerData: any = createAsyncThunk(
  "customers/GET",
  async (_, thunkApi) => {
    try {
      const response = await fetch("/mock_data.json");
      return await response.json();
    } catch (error: any) {
      return thunkApi.rejectWithValue("에러가 발생하였습니다!");
    }
  }
);

export const getAuthUserList: any = createAsyncThunk(
  "auth/GET",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/fake_user.json");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue("존재하지 않는 유저입니다");
    }
  }
);
