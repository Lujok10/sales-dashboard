
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Breadcrumb } from "react-bootstrap";
import { FaBoxes, FaChartBar, FaUser, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "USER";

  const [stats, setStats] = useState({ totalItems: 0, totalSales: 0, lowStock: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/items");
      const items = res.data;
      const totalItems = items.length;
      const totalSales = items.reduce(
        (sum, item) => sum + parseFloat(item.sellingPrice || 0) * (parseFloat(item.quantityInStock || 0)),
        0
      );
      const lowStock = items.filter((item) => item.quantityInStock < 5).length;
      setStats({ totalItems, totalSales, lowStock });
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  return (
    <>
      {/* Navbar – same style as sidebar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Manager Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              {role === "MANAGER" && <Nav.Link onClick={() => navigate("/inventory")}>Inventory</Nav.Link>}
              {role === "MANAGER" && <Nav.Link onClick={() => navigate("/salesList")}>Sales List</Nav.Link>}
              {role === "MANAGER" && <Nav.Link onClick={() => navigate("/reportPage")}>Profit Report</Nav.Link>}
              {role === "MANAGER" && <Nav.Link onClick={() => navigate("/saleForm")}>Record Sale</Nav.Link>}
              {role === "MANAGER" && <Nav.Link onClick={() => navigate("/itemPage")}>Item Page</Nav.Link>}
              <Nav.Link onClick={() => navigate("/settings")}>Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content */}
      <div
        style={{
          minHeight: "75vh",
          background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <Container>
          <Breadcrumb>
            <Breadcrumb.Item active>Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Overview</Breadcrumb.Item>
          </Breadcrumb>

          <h2 className="text-center mb-4">🏠 Manager Dashboard – Overview</h2>
          <p className="text-center text-muted mb-5">
            Welcome to the Sales Dashboard! Manage inventory, monitor sales, and gain insights into your business performance. 
            This dashboard helps you efficiently manage inventory, monitor sales and profits, and gain valuable insights into your business performance.
          </p>

          {/* Summary Statistics */}
          <Row className="mb-5 g-4">
            <Col xs={12} md={4}>
              <Card className="shadow-sm text-center">
                <Card.Body>
                  <FaBoxes size={40} className="mb-2 text-primary" />
                  <Card.Title>Total Items</Card.Title>
                  <h3>{stats.totalItems}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="shadow-sm text-center">
                <Card.Body>
                  <FaChartBar size={40} className="mb-2 text-success" />
                  <Card.Title>Total Sales Value</Card.Title>
                  <h3>${stats.totalSales.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className="shadow-sm text-center">
                <Card.Body>
                  <FaExclamationTriangle size={40} className="mb-2 text-danger" />
                  <Card.Title>Low Stock Items</Card.Title>
                  <h3>{stats.lowStock}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Action Cards */}
          <Row className="g-4">
            <Col xs={12} md={4}>
              <Card className="shadow-sm h-100 hover-shadow">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <FaBoxes size={50} className="mb-3 text-primary" />
                  <Card.Title>Manage Items</Card.Title>
                  <Card.Text className="text-center">
                    Add, edit, or delete items in your inventory.
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate("/itemPage")}>
                    Go to Items
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="shadow-sm h-100 hover-shadow">
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <FaChartBar size={50} className="mb-3 text-success" />
                  <Card.Title>View Reports</Card.Title>
                  <Card.Text className="text-center">
                    Check profit, sales, and other performance metrics.
                  </Card.Text>
                  <Button variant="success" onClick={() => navigate("/reportPage")}>
                    Go to Reports
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {role === "MANAGER" && (
              <Col xs={12} md={4}>
                <Card className="shadow-sm h-100 hover-shadow">
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <FaUser size={50} className="mb-3 text-warning" />
                    <Card.Title>Manage Users</Card.Title>
                    <Card.Text className="text-center">
                      View and manage users with access to the dashboard.
                    </Card.Text>
                    <Button variant="warning" onClick={() => navigate("/users")}>
                      Go to Users
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
}
