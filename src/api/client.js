import axios from "axios";

// Use env in prod, fallback to localhost for dev
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Attach custom headers for user info
api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role") || "GUEST";
  config.headers["X-Username"] = localStorage.getItem("username") || "anonymous";
  return config;
});

export default api;
