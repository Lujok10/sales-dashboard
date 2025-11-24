
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "";

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("roleChanged"));
    navigate("/loginPage");
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      {role && (
        <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
          <h4>Dashboard</h4>
          <ul className="nav flex-column mt-4">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                🏠 Dashboard
              </Link>
            </li>

            {/* Manager Sidebar */}
            {role === "MANAGER" && (
              <>
                <li className="nav-item">
                  <Link to="/inventory" className="nav-link text-white">
                    📦 Inventory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/salesList" className="nav-link text-white">
                    📑 Sales List
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/reportPage" className="nav-link text-white">
                    📊 Profit Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/saleForm" className="nav-link text-white">
                    ➕ Record Sale
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/itemPage" className="nav-link text-white">
                    🛒 Item Page
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link text-white">
                    ⚙️ Settings
                  </Link>
                </li>
              </>
            )}

            {/* Reception Sidebar */}
            {role === "RECEPTION" && (
              <>
                <li className="nav-item">
                  <Link to="/salesDashboard" className="nav-link text-white">
                    🛒 Sales Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/itemPage" className="nav-link text-white">
                    📦 Item Page
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/itemSearchPage" className="nav-link text-white">
                    🔍 Item Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/easyManageSales" className="nav-link text-white">
                    💰 Easy Manage Sales
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/settings" className="nav-link text-white">
                    ⚙️ Settings
                  </Link>
                </li>
              </>
            )}

            {/* Logout */}
            <li className="nav-item mt-3">
              <button
                onClick={handleLogout}
                className="btn btn-outline-light w-100"
              >
                🔑 Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        <main className="flex-grow-1 p-3">{children}</main>

        {/* Footer */}
        <footer className="bg-dark text-light py-3 mt-auto">
          <div className="container text-center">
            <p className="mb-1">&copy; 2025 NSAA Systems. All rights reserved.</p>
            <small className="text-muted">
              This dashboard helps track inventory, sales, and profit reports in real time.
            </small>
          </div>
        </footer>
      </div>
    </div>
  );
}
