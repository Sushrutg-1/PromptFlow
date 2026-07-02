import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoadind: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoadind = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessage: (state, action) => {
      state.messages = [];
    },
  },
});

export const { setLoading, addMessage, clearMessage } = chatSlice.actions;

export default chatSlice.reducer;
