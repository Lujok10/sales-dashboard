// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:9001/api",
// });

// export default api;

// import axios from "axios";

// //const auth = localStorage.getItem("auth");
// const api = axios.create({
//   baseURL: "http://localhost:9001", // your backend port
//   //baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   }
  
// });

//const auth = localStorage.getItem("auth");

//const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // headers: auth ? { Authorization: `Basic ${auth}` } : {},
//  });

//export default api;

// import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:9001/api" });

// api.interceptors.request.use((config) => {
//   config.headers["X-User-Role"] = localStorage.getItem("role");
//   config.headers["X-Username"] = localStorage.getItem("username");
//   return config;
// });

// export default api;


import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: "https://plankton-app-wycb9.ondigitalocean.app/api",
});

// Attach custom headers for user info
api.interceptors.request.use((config) => {
  config.headers["X-User-Role"] = localStorage.getItem("role") || "GUEST";
  config.headers["X-Username"] = localStorage.getItem("username") || "anonymous";
  return config;
});

export default api;
