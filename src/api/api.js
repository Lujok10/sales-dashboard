// src/api/index.js
import axios from "axios";

// Use env var, fall back to localhost for safety
const baseURL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9001/api";

const api = axios.create({
  baseURL,
});

// Attach custom headers for user info
api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role") || "GUEST";
  config.headers["X-Username"] = localStorage.getItem("username") || "anonymous";
  return config;
});

export default api;
