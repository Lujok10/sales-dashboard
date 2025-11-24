
import React, { useState, useEffect } from "react";
import { Table, Form, Button, Row, Col, Modal } from "react-bootstrap";
import api from "../api";

function Inventory() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "", price: "", quantity: "" });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  // Fetch items on load
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get("/inventory");
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch items", error);
    }
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  // Add item
  const addItem = async () => {
    try {
      const response = await api.post("/inventory", {
        ...newItem,
        price: parseFloat(newItem.price),
        quantity: parseInt(newItem.quantity),
      });
      setItems([...items, response.data]);
      setNewItem({ name: "", category: "", price: "", quantity: "" });
    } catch (error) {
      console.error("Failed to add item", error);
    }
  };

  // Delete item
  const deleteItem = async (id) => {
    try {
      await api.delete(`/inventory/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  // Open modal for edit
  const openEditModal = (item) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  // Save edited item
  const saveEdit = async () => {
    try {
      const response = await api.put(`/inventory/${currentItem.id}`, {
        ...currentItem,
        price: parseFloat(currentItem.price),
        quantity: parseInt(currentItem.quantity),
      });
      setItems(items.map((item) => (item.id === currentItem.id ? response.data : item)));
      setShowModal(false);
      setCurrentItem(null);
    } catch (error) {
      console.error("Failed to update item", error);
    }
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>📦 Inventory Management</h2>

      {/* Add Item Form */}
      <Form className="mt-3">
        <Row className="g-2">
          <Col>
            <Form.Control placeholder="Item Name" name="name" value={newItem.name} onChange={handleChange} />
          </Col>
          <Col>
            <Form.Control placeholder="Category" name="category" value={newItem.category} onChange={handleChange} />
          </Col>
          <Col>
            <Form.Control type="number" placeholder="Price" name="price" value={newItem.price} onChange={handleChange} />
          </Col>
          <Col>
            <Form.Control type="number" placeholder="Quantity" name="quantity" value={newItem.quantity} onChange={handleChange} />
          </Col>
          <Col>
            <Button variant="success" onClick={addItem}>Add Item</Button>
          </Col>
        </Row>
      </Form>

      {/* Search */}
      <Form className="mt-3">
        <Form.Control placeholder="Search by name or category" value={search} onChange={(e) => setSearch(e.target.value)} />
      </Form>

      {/* Items Table */}
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(item)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => deleteItem(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentItem && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Item Name</Form.Label>
                <Form.Control name="name" value={currentItem.name} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" value={currentItem.category} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" name="price" value={currentItem.price} onChange={handleEditChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" name="quantity" value={currentItem.quantity} onChange={handleEditChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Inventory;
