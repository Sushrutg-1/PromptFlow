import { createSlice } from "@reduxjs/toolkit";
import {
  createNewConversation,
  getAllConversations,
  getConversation,
  sendMessageThunk,
} from "./chat.thunks";

const initialState = {
  allConversations: [],
  currentConversation: null,

  selectedModels: [
    {
      provider: "google",
      model: "gemini-2.5-flash",
    },
    {
      provider: "groq",
      model: "llama-3.3-70b-versatile",
    },
  ],

  message: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedModels: (state, action) => {
      state.selectedModels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewConversation.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(createNewConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.currentConversation = action.payload?.data;
      })
      .addCase(createNewConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(getAllConversations.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.allConversations = action.payload?.data;
      })
      .addCase(getAllConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(getConversation.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.currentConversation = action.payload?.data;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(sendMessageThunk.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.currentConversation.turns.push(action.payload?.data);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { setSelectedModels } = chatSlice.actions;

export default chatSlice.reducer;
