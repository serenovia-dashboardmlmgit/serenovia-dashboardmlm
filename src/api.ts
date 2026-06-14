// src/api.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if needed
});

// Attach JWT token automatically if it exists in localStorage
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Axios v1+ uses a plain object for headers
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle global response errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

