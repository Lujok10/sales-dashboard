import api from "../api/client";

export const login = async (username, password) => {
  const payload = { username, password }; // matches your User fields

  const response = await api.post("/auth/login", payload);
  // backend returns a simple String body like "Login successful as MANAGER"
  return response.data;
};
