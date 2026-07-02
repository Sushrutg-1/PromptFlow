import api from "@/config/axios";

export const login = (data) => api.post("/users/login", data);

export const signup = (data) => api.post("/users/register", data);

export const logout = (data) => api.post("/users/logout");

export const getCurrentUser = () => api.get("/users/current-user");
