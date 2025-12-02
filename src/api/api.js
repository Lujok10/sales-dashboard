// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // 🔥 now frontend will call same-origin /api, Nginx will proxy
});

api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role") || "GUEST";
  config.headers["X-Username"] = localStorage.getItem("username") || "anonymous";
  return config;
});

export default api;
