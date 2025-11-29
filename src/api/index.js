
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

// Set default role for testing
// if (!localStorage.getItem("role")) {
//   localStorage.setItem("role", "MANAGER"); // or "STAFF"
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
