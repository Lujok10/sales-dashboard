// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://plankton-app-wycb9.ondigitalocean.app/api",
});

api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role") || "GUEST";
  config.headers["X-Username"] = localStorage.getItem("username") || "anonymous";
  return config;
});

export default api;  // 🔥 THIS IS CRITICAL
