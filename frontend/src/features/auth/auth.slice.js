import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUserThunk,
  loginUser,
  logoutUserThunk,
  signupUser,
  updateAccountDetailsThunk,
  updateUserAvatarThunk,
} from "./auth.thunks";

const initialState = {
  user: null,

  isAuthenticated: false,
  isInitializing: true,

  isLoading: false,
  isError: false,
  isSuccess: false,

  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })

      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.isAuthenticated = true;
        state.user = action.payload.data;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })

      .addCase(getCurrentUserThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.isInitializing = false;
      })

      .addCase(getCurrentUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isInitializing = false;
        state.message = action.payload?.message || "Something went wrong";
      })

      .addCase(logoutUserThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })

      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })

      .addCase(updateAccountDetailsThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })

      .addCase(updateAccountDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })

      .addCase(updateAccountDetailsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })

      .addCase(updateUserAvatarThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateUserAvatarThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.data;
      })
      .addCase(updateUserAvatarThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
