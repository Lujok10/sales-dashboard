

// #####################production ready ########################
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api"; // <-- Replace axios import with api

// preload all images in assets/images
const images = require.context("../assets/images", false, /\.(png|jpe?g|svg)$/);

// Helper to get item image
const getImage = (name) => {
  if (!name) return images("./default.jpg");

  const formatted = name.toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
  const extensions = [".jpg", ".jpeg", ".png", ".svg"];
  for (let ext of extensions) {
    try {
      return images(`./${formatted}${ext}`);
    } catch (err) {}
  }

  try {
    return images("./default.jpg");
  } catch (err) {
    return "";
  }
};

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Role Sync Logic
  useEffect(() => {
    const syncRole = () => {
      setRole(localStorage.getItem("role") || "");
    };

    window.addEventListener("roleChanged", syncRole);
    window.addEventListener("storage", syncRole);

    return () => {
      window.removeEventListener("roleChanged", syncRole);
      window.removeEventListener("storage", syncRole);
    };
  }, []);

  // Fetch item with api
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/items/${id}`); // <-- Updated
        setItem(res.data);
      } catch (err) {
        setError("Failed to fetch item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p className="text-center text-muted mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  const getCategoryBorder = (category) => {
    if (!category) return "border-secondary";
    switch (category.toLowerCase()) {
      case "beverages":
        return "border-primary";
      case "snacks":
        return "border-success";
      case "dairy":
        return "border-warning";
      default:
        return "border-info";
    }
  };

  const lowStock = item.quantityInStock < 5;

  return (
    <>
      {/* Header */}
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">Inventory App</a>
        </div>
      </nav> */}

      {/* Content */}
      <div className="container mt-3">
        <h1 className="mb-4 text-primary">📑 Item Details</h1>

        <div
          className={`card shadow-lg ${getCategoryBorder(item.category)}`}
          style={{ borderLeftWidth: "5px", borderLeftStyle: "solid" }}
        >
          <div className="row g-0">
            {/* Left - Details */}
            <div className="col-md-8 p-4">
              <h3>{item.name}</h3>
              <p>
                <span className="badge bg-secondary me-2">{item.category}</span>
                <small className="text-muted">{item.brand}</small>
              </p>
              <p><strong>Cost Price:</strong> ${parseFloat(item.costPrice).toFixed(2)}</p>
              <p><strong>Selling Price:</strong> ${parseFloat(item.sellingPrice).toFixed(2)}</p>
              <p className={lowStock ? "text-danger" : ""}>
                <strong>Quantity:</strong> {item.quantityInStock} {lowStock && <span className="badge bg-danger">Low</span>}
              </p>
              <p><strong>Total Value:</strong> ${(parseFloat(item.sellingPrice) * item.quantityInStock).toFixed(2)}</p>

              <button className="btn btn-primary mt-3" onClick={() => navigate("/itemPage")}>
                ← Back to Items
              </button>

              {/* Manager-only button */}
              {role === "MANAGER" && (
                <button className="btn btn-danger mt-2 ms-2">
                  🗑️ Delete Item
                </button>
              )}
            </div>

            {/* Right - Image */}
            <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
              <img
                src={getImage(item.name)}
                alt={item.name}
                className="img-fluid rounded"
                style={{ objectFit: "cover", height: "250px", width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-dark text-light py-3 mt-5">
        <div className="container text-center">
          <small>&copy; 2025 Inventory App. All rights reserved.</small>
        </div>
      </footer> */}
    </>
  );
}
