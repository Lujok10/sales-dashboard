

import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from "chart.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Using API instance

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

export default function Inventory() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "USER";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/items");
        setItems(res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const totalStock = items.reduce((sum, item) => sum + (item.quantityInStock || 0), 0);
  const soldItems = items.reduce((sum, item) => sum + (item.sold || 0), 0);

  const pieData = {
    labels: ["In Stock", "Sold"],
    datasets: [{ data: [totalStock, soldItems], backgroundColor: ["#36A2EB", "#FF6384"] }],
  };

  const barData = {
    labels: items.map((item) => item.name),
    datasets: [
      { label: "Stock", data: items.map((item) => item.quantityInStock || 0), backgroundColor: "#36A2EB" },
      { label: "Sold", data: items.map((item) => item.sold || 0), backgroundColor: "#FF6384" },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: { legend: { position: "bottom" } },
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("📦 Inventory Report", 14, 15);

    const tableData = items.map((item) => [
      item.name,
      item.category,
      item.quantityInStock,
      item.sellingPrice?.toFixed(2),
      ((item.quantityInStock || 0) * (item.sellingPrice || 0)).toFixed(2),
    ]);

    autoTable(doc, {
      startY: 20,
      head: [["Item", "Category", "In Stock", "Price ($)", "Total Value ($)"]],
      body: tableData,
    });

    doc.save("inventory_report.pdf");
  };

  const exportExcel = () => {
    const data = items.map((item) => ({
      Item: item.name,
      Category: item.category,
      "In Stock": item.quantityInStock,
      "Price ($)": item.sellingPrice?.toFixed(2),
      "Total Value ($)": ((item.quantityInStock || 0) * (item.sellingPrice || 0)).toFixed(2),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "inventory_report.xlsx");
  };

  if (loading) return <p className="text-center">Loading inventory data...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <span className="navbar-brand">Inventory</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate("/dashboard")}>Dashboard</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate("/easyManageSales")}>Sales</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate("/inventory")}>Inventory</span>
              </li>
              <li className="nav-item">
                <span className="nav-link" onClick={() => navigate("/settings")}>Settings</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mb-5">
        <h2 className="mb-4 text-primary">📦 Inventory Management</h2>

        {/* Charts */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card p-3 shadow" style={{ height: "350px" }}>
              <h5 className="text-center">Stock vs Sold</h5>
              <div style={{ height: "280px" }}>
                <Pie data={pieData} options={chartOptions} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card p-3 shadow" style={{ height: "350px" }}>
              <h5 className="text-center">Items Stock & Sales</h5>
              <div style={{ height: "280px" }}>
                <Bar data={barData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="card shadow p-3">
          <h5 className="mb-3">📊 Inventory Table</h5>
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>In Stock</th>
                <th>Price ($)</th>
                <th>Total Value ($)</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.quantityInStock}</td>
                    <td>{item.sellingPrice?.toFixed(2)}</td>
                    <td>{((item.quantityInStock || 0) * (item.sellingPrice || 0)).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No inventory found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-3 d-flex gap-2">
            <button className="btn btn-danger" onClick={exportPDF}>📄 Export PDF</button>
            <button className="btn btn-success" onClick={exportExcel}>📊 Export Excel</button>
          </div>
        </div>
      </div>
    </>
  );
}
