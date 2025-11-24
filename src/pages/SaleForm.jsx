

import { useState } from "react";
import { Form, Button, Alert, Container, Card, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ✅ Use shared API instead of axios

export default function SaleForm() {
  const [itemId, setItemId] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      // ✅ Using shared API instance
      const res = await api.post("/sales", {
        itemId,
        quantitySold,
      });

      setMessage(`✅ Sale recorded successfully (ID: ${res.data.id})`);
      setItemId("");
      setQuantitySold("");

      // optional: notify dashboard to refresh
      window.dispatchEvent(new Event("refreshDashboard"));
    } catch (err) {
      console.error(err);
      setError("❌ Failed to record sale. Please try again.");
    }
  };

  return (
    <>
      {/* Header */}
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

      {/* Content */}
      <Container className="mt-4">
        <Card className="shadow-sm p-4">
          <h3 className="mb-3 text-primary">🛒 Record a Sale</h3>

          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                type="number"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity Sold</Form.Label>
              <Form.Control
                type="number"
                value={quantitySold}
                onChange={(e) => setQuantitySold(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Sale
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}
