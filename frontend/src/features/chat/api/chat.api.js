import api from "@/config/interceptor";

export const createConversation = () => api.post("/conversations");

export const getConversations = () => api.get("/conversations");

export const getConversationById = (conversationId) => api.get(`/conversations/${conversationId}`);

export const sendMessage = (conversationId, payload) =>
  api.post(`/conversations/${conversationId}/send-message`, payload);

export const renameConversation = (conversationId, payload) =>
  api.patch(`/conversations/${conversationId}`, payload);

export const deleteConversation = (conversationId) =>
  api.delete(`/conversations/${conversationId}`);
