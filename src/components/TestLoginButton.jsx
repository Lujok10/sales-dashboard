import React from "react";
import { login } from "../services/authService";

function TestLoginButton() {
  const handleLoginTest = async () => {
    try {
      const result = await login("testUser", "testPassword");
      console.log("Backend response:", result);
    } catch (err) {
      console.error("Error from backend:", err);
    }
  };

  return (
    <button onClick={handleLoginTest}>
      Test Backend Login
    </button>
  );
}

export default TestLoginButton;
