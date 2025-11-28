

// import axios from "axios";

// // Base API instance
// const api = axios.create({
//   baseURL: "http://localhost:9001/api",
// });

// // Attach custom headers for user info
// api.interceptors.request.use((config) => {
//   config.headers["X-User-Role"] = localStorage.getItem("role") || "GUEST";
//   config.headers["X-Username"] = localStorage.getItem("username") || "anonymous";
//   return config;
// });

// export default api;

import axios from "axios";

// Read from env in production, fallback to localhost for dev
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:9001/api";

// Base API instance
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


