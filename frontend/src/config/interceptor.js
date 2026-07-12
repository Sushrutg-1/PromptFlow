import api from "./axios";
import { store } from "@/app/store";
import { logout } from "@/features/auth/auth.slice";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthRequest =
      originalRequest.url.includes("/users/login") ||
      originalRequest.url.includes("/users/register") ||
      originalRequest.url.includes("/users/refresh-token") ||
      originalRequest.url.includes("/users/logout");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/users/refresh-token");

        processQueue();

        return api(originalRequest);
      } catch (err) {
        processQueue(err);

        store.dispatch(logout());

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
