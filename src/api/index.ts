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

export const handleAuthUserAPI = async (userInfo: any) => {
  const response: any = await axios.post(
    "http://192.168.11.164:8080/Code/GetTokenBearer",
    { userName: userInfo.userName, password: userInfo.password }
  );
  return response.data;
};
