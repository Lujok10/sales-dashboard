

import { useState, useEffect } from "react";
import { Row, Col, Button, Badge, Modal, Form, Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function EasyManageSales() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [saleQuantity, setSaleQuantity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setShowModal(false);
  };

  const openSaleModal = (item) => {
    setSelectedItem(item);
    setSaleQuantity("");
    setShowSaleModal(true);
  };

  const closeSaleModal = () => {
    setShowSaleModal(false);
    setSelectedItem(null);
  };

  const recordSale = async () => {
    if (!saleQuantity || saleQuantity <= 0) return alert("Enter valid quantity");
    if (saleQuantity > selectedItem.quantityInStock)
      return alert("Not enough stock for this sale");

    try {
      // ✅ correct backend request field: quantitySold
      await api.post(`/sales`, {
        itemId: selectedItem.id,
        quantitySold: saleQuantity,
      });

      // Update UI locally
      const updated = items.map((item) =>
        item.id === selectedItem.id
          ? { ...item, quantityInStock: item.quantityInStock - saleQuantity }
          : item
      );

      setItems(updated);
      closeSaleModal();
    } catch (error) {
      console.error("Error recording sale:", error);
    }
  };

  return (
    <>
      {/* === Reception Header Navigation === */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Sales Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/salesDashboard")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/saleForm")}>Record Sale</Nav.Link>
              <Nav.Link onClick={() => navigate("/easyManageSales")}>Easy Manage Sales</Nav.Link>
              <Nav.Link onClick={() => navigate("/settings")}>Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* === Main Content === */}
      <div className="container mt-4 mb-5">
        <h2 className="mb-4 text-center text-primary fw-bold">Manage & Track Sales</h2>

        <Row>
          {items.map((item) => {
            const lowStock = item.quantityInStock < 5;

            return (
              <Col key={item.id} xs={12} md={3} className="mb-3">
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.category} • {item.brand}</p>

                    <p className="card-text mb-1">
                      <strong>Price:</strong> ${parseFloat(item.sellingPrice).toFixed(2)}
                    </p>

                    <p className={`card-text mb-2 ${lowStock ? "text-danger" : ""}`}>
                      <strong>Stock:</strong> {item.quantityInStock}{" "}
                      {lowStock && <Badge bg="danger">Low</Badge>}
                    </p>

                    <Button variant="link" className="mt-auto p-0" onClick={() => openModal(item)}>
                      View Details &gt;
                    </Button>

                    <Button
                      variant="success"
                      size="sm"
                      className="mt-2"
                      onClick={() => openSaleModal(item)}
                      disabled={item.quantityInStock === 0}
                    >
                      Record Sale
                    </Button>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* === Item Details Modal === */}
        <Modal show={showModal} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem?.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <>
                <p><strong>Category:</strong> {selectedItem.category}</p>
                <p><strong>Brand:</strong> {selectedItem.brand}</p>
                <p><strong>Cost Price:</strong> ${parseFloat(selectedItem.costPrice).toFixed(2)}</p>
                <p><strong>Selling Price:</strong> ${parseFloat(selectedItem.sellingPrice).toFixed(2)}</p>
                <p><strong>Stock:</strong> {selectedItem.quantityInStock}</p>
                <p><strong>Description:</strong> {selectedItem.description || "N/A"}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>

        {/* === Record Sale Modal === */}
        <Modal show={showSaleModal} onHide={closeSaleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Record Sale</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem && (
              <>
                <p><strong>Item:</strong> {selectedItem.name}</p>
                <p><strong>Available Stock:</strong> {selectedItem.quantityInStock}</p>

                <Form.Group>
                  <Form.Label>Quantity Sold</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={saleQuantity}
                    onChange={(e) => setSaleQuantity(parseInt(e.target.value))}
                    placeholder="Enter quantity"
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeSaleModal}>Cancel</Button>
            <Button variant="primary" onClick={recordSale}>Confirm Sale</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
