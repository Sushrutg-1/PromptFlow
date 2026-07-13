import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createConversation,
  getConversations,
  getConversationById,
  sendMessage,
  deleteConversation,
  renameConversation,
} from "./api/chat.api";

export const createNewConversation = createAsyncThunk(
  "conversation/createNewConversation",
  async (data, thunkAPI) => {
    try {
      const response = await createConversation();
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

export const getAllConversations = createAsyncThunk(
  "conversations/getAllConversations",
  async (data, thunkAPI) => {
    try {
      const response = await getConversations();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      // console.error("Error in  thunk: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data ?? {
          message: error.message,
          success: false,
        }
      );
    }
  }
);

export const getConversation = createAsyncThunk(
  "conversations/getConversationById",
  async (conversationId, thunkAPI) => {
    try {
      const response = await getConversationById(conversationId);
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

export const sendMessageThunk = createAsyncThunk(
  "conversation/sendMessage",
  async (data, thunkAPI) => {
    try {
      const { conversationId, payload } = data;
      const response = await sendMessage(conversationId, payload);
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

export const renameConversationThunk = createAsyncThunk(
  "conversations/renameConversation",
  async (data, thunkAPI) => {
    try {
      const { id, title } = data;
      const response = await renameConversation(id, { title });
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

export const deleteConversationThunk = createAsyncThunk(
  "conversations/deleteConversation",
  async (conversationId, thunkAPI) => {
    try {
      const response = await deleteConversation(conversationId);
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
