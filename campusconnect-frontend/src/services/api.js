// src/services/api.js
import axios from "axios";

// ✅ Set base URL from env or fallback to local
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensures cookies/session are sent if needed
});

// ✅ Attach JWT token from localStorage (if exists) to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;


