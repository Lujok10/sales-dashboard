

import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: "http://localhost:9001/api",
});

// Attach custom headers for user info
api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role") || "GUEST";
  config.headers["X-Username"] = localStorage.getItem("username") || "anonymous";
  return config;
});

export default api;

