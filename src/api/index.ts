import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://192.168.11.31:8080/",
  headers: { "Content-Type": "application/json" },
  timeout: 3000,
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

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
  try {
    const response: any = await Axios.post("Code/GetTokenBearer", {
      userName: userInfo.userName,
      password: userInfo.password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCodeAPI = async (createCodeGroup: any) => {
  try {
    const response = await Axios.post(
      "Code/GroupCodelist/new",
      createCodeGroup
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSubCodeAPI = async (subCodeList: any) => {
  try {
    await Axios.post("Code/Codelist/new", subCodeList);
  } catch (error) {
    throw error;
  }
};

export const fetchGroupCodeAPI = async () => {
  try {
    const response = await Axios.get("Code/GroupCodelist");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCodeListAPI = async () => {
  try {
    const response = await Axios.get("Code/codelist");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCodeAPI = async (Id: any, editCodeGroup: any) => {
  try {
    await Axios.put(`Code/GroupCodelist/modify/${Id}`, editCodeGroup);
  } catch (error) {
    throw error;
  }
};

export const updateSubCodeAPI = async (Id: any, editCodeListGroup: any) => {
  try {
    // await Axios.put(`Code/Codelist/modify?Id=${Id}`, editCodeListGroup);
    await Axios.put(`Code/Codelist/modify/${Id}`, editCodeListGroup);
  } catch (error) {
    throw error;
  }
};

export const deleteCodeAPI = async (Id: string, GroupCode: string) => {
  try {
    await Axios.delete(
      `Code/GroupCodelist/delete?id=${Id}&strGroupCode=${GroupCode}`
    );
  } catch (error) {
    throw error;
  }
};

export const deleteSubCodeAPI = async (Id: any) => {
  try {
    await Axios.delete(`Code/Codelist/delete?id=${Id}`);
  } catch (error) {
    throw error;
  }
};
