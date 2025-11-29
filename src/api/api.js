
import axios from "axios";

const api = axios.create({ baseURL: "https://plankton-app-wycb9.ondigitalocean.app/api" });

api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role");
  config.headers["X-Username"] = localStorage.getItem("username");
  return config;
});

export default api;



