import api from "@/config/interceptor";

export const signup = (data) => api.post("/users/register", data);

export const login = (data) => api.post("/users/login", data);

export const logout = () => api.get("/users/logout");

export const getCurrentUser = () => api.get("/users/current-user");
