

import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:9001/api" });

api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role");
  config.headers["X-Username"] = localStorage.getItem("username");
  return config;
});

export default api;



