import api from "@/config/axios";

export const login = (data) => api.post("/users/login", data);
