import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  login,
  logout,
  signup,
  updateAccountDetails,
  updateUserAvatar,
} from "./api/auth.api";

export const signupUser = createAsyncThunk("users/signup", async (data, thunkAPI) => {
  try {
    const response = await signup(data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    // console.error("Error in signupUser thunk: ", error);/
    return thunkAPI.rejectWithValue(
      error.response?.data ?? {
        message: error.message,
        success: false,
      }
    );
  }
});

export const loginUser = createAsyncThunk("users/login", async (data, thunkAPI) => {
  try {
    const response = await login(data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    // console.error("Error in loginUser thunk: ", error);
    return thunkAPI.rejectWithValue(
      error.response?.data ?? {
        message: error.message,
        success: false,
      }
    );
  }
});

export const getCurrentUserThunk = createAsyncThunk("users/getCurrentUser", async (_, thunkAPI) => {
  try {
    const response = await getCurrentUser();
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data ?? {
        message: error.message,
        success: false,
      }
    );
  }
});

export const logoutUserThunk = createAsyncThunk("users/logout", async (_, thunkAPI) => {
  try {
    const response = await logout();
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data ?? {
        message: error.message,
        success: false,
      }
    );
  }
});

export const updateAccountDetailsThunk = createAsyncThunk(
  "users/updateAccountDetails",
  async (data, thunkAPI) => {
    try {
      const response = await updateAccountDetails(data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          message: error.message,
          success: false,
        }
      );
    }
  }
);

export const updateUserAvatarThunk = createAsyncThunk(
  "users/updateUserAvatar",
  async (image, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", image);
      const response = await updateUserAvatar(formData);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          message: error.message,
          success: false,
        }
      );
    }
  }
);
