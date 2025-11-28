// src/TestLoginButton.jsx
import React from "react";
import { login } from "./services/authService";

function TestLoginButton() {
  const handleTest = async () => {
    try {
      const data = await login("testUser", "testPassword");
      console.log("Login API response:", data);
    } catch (err) {
      console.error("Login API error:", err.response || err);
    }
  };

  return <button onClick={handleTest}>Test Login API</button>;
}

export default TestLoginButton;
