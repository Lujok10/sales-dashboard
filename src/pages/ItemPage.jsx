
//###################################################### New Final
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

// ✅ Always load from /public/images folder
const getImage = (imageName) => {
  if (!imageName) return "/images/default.jpg"; // fallback
  return `/images/${imageName}`; // served by React /public/images
};

export default function ItemPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    costPrice: "",
    sellingPrice: "",
    quantityInStock: ""
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // ✅ File change preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageName = "default.jpg";

      // ✅ Save only filename to DB
      if (file) {
        imageName = file.name;
      }

      const res = await api.post("/items", { ...form, imageName });
      const newItem = res.data;

      // ✅ Update UI
      setItems((prev) => [newItem, ...prev]);

      // Reset form
      setForm({
        name: "",
        category: "",
        brand: "",
        costPrice: "",
        sellingPrice: "",
        quantityInStock: ""
      });
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updatePrice = async (itemId) => {
    const newPrice = prompt("Enter new selling price:");
    if (newPrice && !isNaN(newPrice) && parseFloat(newPrice) > 0) {
      try {
        await api.put(`/items/${itemId}/price`, null, { params: { newPrice } });
        fetchItems();
      } catch (error) {
        console.error("Error updating price:", error);
      }
    }
  };

  const addStock = async (itemId) => {
    const additionalQuantity = prompt("Enter quantity to add:");
    if (additionalQuantity && !isNaN(additionalQuantity) && parseInt(additionalQuantity) > 0) {
      try {
        await api.put(`/items/${itemId}/stock`, null, { params: { additionalQuantity } });
        fetchItems();
      } catch (error) {
        console.error("Error adding stock:", error);
      }
    }
  };

  const deleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/items/${itemId}`);
        fetchItems();
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("Failed to delete item.");
      }
    }
  };

  const filteredItems = items.filter((item) =>
    (item.name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

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

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">Inventory App</a>
        </div>
      </nav> */}

      <div className="container my-4">
        <h2 className="text-center text-primary mb-4">📦 Inventory Dashboard</h2>

        {/* Add Item Form */}
        <form onSubmit={handleSubmit} className="mb-5 p-4 bg-light shadow rounded">
          <h4 className="mb-4 text-secondary">🛒 Add New Item</h4>
          <div className="row g-3">
            <div className="col-md-4">
              <input type="text" placeholder="Name" className="form-control"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="col-md-4">
              <input type="text" placeholder="Category" className="form-control"
                value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
            </div>
            <div className="col-md-4">
              <input type="text" placeholder="Brand" className="form-control"
                value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} required />
            </div>
            <div className="col-md-3">
              <input type="number" placeholder="Cost Price" className="form-control"
                value={form.costPrice} onChange={e => setForm({ ...form, costPrice: e.target.value })} required />
            </div>
            <div className="col-md-3">
              <input type="number" placeholder="Selling Price" className="form-control"
                value={form.sellingPrice} onChange={e => setForm({ ...form, sellingPrice: e.target.value })} required />
            </div>
            <div className="col-md-3">
              <input type="number" placeholder="Quantity" className="form-control"
                value={form.quantityInStock} onChange={e => setForm({ ...form, quantityInStock: e.target.value })} required />
            </div>

            {/* File Upload + Preview */}
            <div className="col-md-3">
              <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
              {preview && <img src={preview} alt="preview"
                className="mt-2" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />}
            </div>

            <div className="col-md-3 d-grid">
              <button type="submit" className="btn btn-primary mt-2">Add Item</button>
            </div>
          </div>
        </form>

        {/* Search */}
        <input type="text" placeholder="Search by name..." className="form-control mb-4"
          value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

        {/* Item Cards */}
        <h3 className="mb-4 text-primary">📑 Item Lists</h3>
        <div className="row g-4">
          {filteredItems.map(item => {
            const lowStock = item.quantityInStock < 5;
            return (
              <div key={item.id} className="col-md-3">
                <div
                  className={`card h-100 shadow rounded ${getCategoryBorder(item.category)}`}
                  style={{ borderLeftWidth: "5px", borderLeftStyle: "solid", cursor: "pointer", transition: "transform 0.2s" }}
                  onClick={() => navigate(`/items/${item.id}`)}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  <img
                    src={getImage(item.imageName)}
                    alt={item.name}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px", width: "100%" }}
                    onError={(e) => { e.target.src = "/images/default.jpg"; }} // ✅ fallback if missing
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="text-muted small mt-1">
                      <span className="fw-semibold">{item.category}</span>
                      <span className="mx-2">•</span>
                      <span className="fst-italic">{item.brand}</span>
                    </p>
                    <p className="mb-1"><strong>Cost:</strong> ${parseFloat(item.costPrice).toFixed(2)}</p>
                    <p className="mb-1"><strong>Selling:</strong> ${parseFloat(item.sellingPrice).toFixed(2)}</p>
                    <p className={`mb-2 ${lowStock ? "text-danger" : ""}`}>
                      <strong>Stock:</strong> {item.quantityInStock} {lowStock && <span className="badge bg-danger">Low</span>}
                    </p>
                    <div className="d-flex gap-2 mt-auto">
                      <button className="btn btn-warning btn-sm flex-fill" onClick={(e) => { e.stopPropagation(); updatePrice(item.id); }}>Update Price</button>
                      <button className="btn btn-success btn-sm flex-fill" onClick={(e) => { e.stopPropagation(); addStock(item.id); }}>Add Stock</button>
                      <button className="btn btn-danger btn-sm flex-fill" onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <footer className="bg-dark text-light py-3 mt-5">
        <div className="container text-center">
          <small>&copy; 2025 Inventory App. All rights reserved.</small>
        </div>
      </footer> */}
    </>
  );
}

