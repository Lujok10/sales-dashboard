import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ✅ single axios import

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", form, {
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      alert("Login failed: " + response.data);
      return;
    }

    const roleMatch = response.data.match(/as (MANAGER|RECEPTION|ADMIN)/);
    if (!roleMatch) {
      alert("Login successful, but role not recognized.");
      return;
    }

    const role = roleMatch[1];

    localStorage.setItem("username", form.username);
    localStorage.setItem("role", role);
    window.dispatchEvent(new Event("roleChanged"));

    alert(`Welcome ${form.username}! You are logged in as ${role}.`);

    if (role === "MANAGER" || role === "ADMIN") {
      navigate("/");                // ✅ Manager → root → ManagerDashboard
    } else {
      navigate("/salesDashboard");  // ✅ Reception → SalesDashboard
    }
  } catch (err) {
    console.error(err);
    alert("Error connecting to server.");
  }
};


  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="/logo.gif"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
            className="mb-2"
          />
          <h2 className="fw-bold text-primary">Login</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
         
        </div>
      </div>
    </div>
  );
}
