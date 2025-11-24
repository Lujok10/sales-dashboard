

import { useState, useEffect } from "react";
import api from "../api"; // Axios instance pointing to http://localhost:9001

export default function Items() {
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const [items, setItems] = useState([]);

  // Fetch items from backend
  const fetchItems = async () => {
    try {
      const res = await api.get("/api/items");
      setItems(res.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Create item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/items", form);
      setForm({ name: "", category: "", price: "", quantity: "" }); // reset form
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Items</h2>
      {/* Create Item Form */}
      <form className="row g-3 mb-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Add Item</button>
        </div>
      </form>

      {/* Item List */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No items found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
