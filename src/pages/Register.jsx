import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "RECEPTION",
  });
  const navigate = useNavigate();

  // Only MANAGER can access this page
  useEffect(() => {
    const role = localStorage.getItem("role");
    console.log("Register guard – role:", role);

    if (!role) {
      alert("Please log in as a manager first.");
      navigate("/loginPage");
      return;
    }

    if (role !== "MANAGER") {
      alert("Only managers can create new user accounts.");
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/loginPage");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <img
            src="/logo.gif"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
            className="mb-2"
          />
          <h2 className="fw-bold text-primary">Register Account</h2>
        </div>

        <form onSubmit={handleSubmit}>
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

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-select"
            >
              <option value="MANAGER">Manager</option>
              <option value="RECEPTION">Reception</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Already registered?{" "}
            <a href="/loginPage" className="text-decoration-none text-primary">
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}
