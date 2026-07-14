import { createSlice } from "@reduxjs/toolkit";
import {
  createNewConversation,
  deleteConversationThunk,
  getAllConversations,
  getConversation,
  renameConversationThunk,
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

  loading: {
    createConversation: false,
    getConversations: false,
    getConversation: false,
    sendMessage: false,
    renameConversation: false,
    deleteConversation: false,
  },

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
        state.loading.createConversation = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(createNewConversation.fulfilled, (state, action) => {
        state.loading.createConversation = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.currentConversation = action.payload?.data;
      })
      .addCase(createNewConversation.rejected, (state, action) => {
        state.loading.createConversation = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(getAllConversations.pending, (state, action) => {
        state.loading.getConversations = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllConversations.fulfilled, (state, action) => {
        state.loading.getConversations = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.allConversations = action.payload?.data;
      })
      .addCase(getAllConversations.rejected, (state, action) => {
        state.loading.getConversations = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(getConversation.pending, (state, action) => {
        state.loading.getConversation = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.loading.getConversation = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.currentConversation = action.payload?.data;
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.loading.getConversation = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(sendMessageThunk.pending, (state, action) => {
        state.loading.sendMessage = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.loading.sendMessage = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
        state.currentConversation.turns.push(action.payload?.data);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.loading.sendMessage = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(deleteConversationThunk.pending, (state, action) => {
        state.loading.deleteConversation = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteConversationThunk.fulfilled, (state, action) => {
        state.loading.deleteConversation = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(deleteConversationThunk.rejected, (state, action) => {
        state.loading.deleteConversation = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      })
      .addCase(renameConversationThunk.pending, (state, action) => {
        state.loading.renameConversation = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(renameConversationThunk.fulfilled, (state, action) => {
        state.loading.renameConversation = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload?.message;
      })
      .addCase(renameConversationThunk.rejected, (state, action) => {
        state.loading.renameConversation = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { setSelectedModels } = chatSlice.actions;

export default chatSlice.reducer;
