import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";                      // ✅ import App
import "bootstrap/dist/css/bootstrap.min.css";

// Optional: default role for testing (OK for now)
if (!localStorage.getItem("role")) {
  localStorage.setItem("role", "MANAGER"); // or "STAFF"
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
