import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export default function ItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    costPrice: "",
    sellingPrice: "",
    quantityInStock: "",
  });

  const [errors, setErrors] = useState([]);

  const validate = () => {
    const newErrors = [];

    if (!formData.name) newErrors.push("Name is required.");
    if (!formData.category) newErrors.push("Category is required.");
    if (!formData.brand) newErrors.push("Brand is required.");
    if (!formData.costPrice || Number(formData.costPrice) <= 0)
      newErrors.push("Cost Price must be positive.");
    if (!formData.sellingPrice || Number(formData.sellingPrice) <= 0)
      newErrors.push("Selling Price must be positive.");
    if (!formData.quantityInStock || Number(formData.quantityInStock) < 0)
      newErrors.push("Quantity must be 0 or more.");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onAddItem({
      ...formData,
      createdAt: new Date(),
    });

    setFormData({
      name: "",
      category: "",
      brand: "",
      costPrice: "",
      sellingPrice: "",
      quantityInStock: "",
    });
    setErrors([]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4>Add New Item</h4>

      {errors.length > 0 && (
        <Alert variant="danger">
          <ul>
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter item name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Brand</Form.Label>
        <Form.Control
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Enter brand"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cost Price</Form.Label>
        <Form.Control
          type="number"
          name="costPrice"
          value={formData.costPrice}
          onChange={handleChange}
          placeholder="Enter cost price"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Selling Price</Form.Label>
        <Form.Control
          type="number"
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          placeholder="Enter selling price"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity in Stock</Form.Label>
        <Form.Control
          type="number"
          name="quantityInStock"
          value={formData.quantityInStock}
          onChange={handleChange}
          placeholder="Enter quantity"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Item
      </Button>
    </Form>
  );
}
