// src/pages/Settings.jsx
import { useState } from "react";
import api from "../api";

export default function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (form.newPassword !== form.confirmNewPassword) {
      setErrorMsg("New password and confirmation do not match.");
      return;
    }

    if (!form.currentPassword || !form.newPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      if (response.status === 200) {
        setSuccessMsg("Password updated successfully.");
        setForm({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        setErrorMsg(response.data || "Failed to update password.");
      }
    } catch (err) {
      console.error(err);
      const backendMessage =
        err.response?.data || "Error updating password. Please try again.";
      setErrorMsg(
        typeof backendMessage === "string"
          ? backendMessage
          : "Error updating password."
      );
    } finally {
      setLoading(false);
    }
  };

  const username = localStorage.getItem("username") || "Unknown User";
  const role = localStorage.getItem("role") || "UNKNOWN";

  return (
    <div className="container mt-4 mb-5">
      <h2 className="mb-4">Settings</h2>

      {/* User info */}
      <div className="mb-4">
        <h5>Account Information</h5>
        <p className="mb-1">
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Role:</strong> {role}
        </p>
      </div>

      {/* Change Password Card */}
      <div className="card shadow-sm" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h5 className="card-title mb-3">Change Password</h5>
          <p className="text-muted">
            Update your password. You will need your current password to confirm
            this change.
          </p>

          {successMsg && (
            <div className="alert alert-success" role="alert">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="form-control"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                className="form-control"
                value={form.confirmNewPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
