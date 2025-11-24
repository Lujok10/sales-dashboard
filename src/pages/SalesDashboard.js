// import { useState, useEffect } from "react";
// import { Row, Col, Button, Badge, Modal, Form } from "react-bootstrap";
// import api from "../api";

// export default function SalesDashboard() {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showSaleModal, setShowSaleModal] = useState(false);
//   const [saleQuantity, setSaleQuantity] = useState("");

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await api.get("/items");
//       setItems(response.data);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   const openModal = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedItem(null);
//     setShowModal(false);
//   };

//   const openSaleModal = (item) => {
//     setSelectedItem(item);
//     setSaleQuantity("");
//     setShowSaleModal(true);
//   };

//   const closeSaleModal = () => {
//     setShowSaleModal(false);
//     setSelectedItem(null);
//   };

//   const recordSale = async () => {
//     if (!saleQuantity || saleQuantity <= 0) return alert("Enter valid quantity");
//     if (saleQuantity > selectedItem.quantityInStock)
//       return alert("Not enough stock for this sale");

//     try {
//       await api.post(`/sales`, {
//         itemId: selectedItem.id,
//         quantity: saleQuantity,
//       });

//       // Update stock locally after sale
//       const updated = items.map((item) =>
//         item.id === selectedItem.id
//           ? { ...item, quantityInStock: item.quantityInStock - saleQuantity }
//           : item
//       );
//       setItems(updated);
//       closeSaleModal();
//     } catch (error) {
//       console.error("Error recording sale:", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Sales Dashboard</h2>

//       {/* Cards Layout */}
//       <Row>
//         {items.map((item) => {
//           const lowStock = item.quantityInStock < 5;
//           return (
//             <Col key={item.id} xs={12} md={3} className="mb-3">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{item.name}</h5>
//                   <p className="card-text">{item.category} • {item.brand}</p>
//                   <p className="card-text mb-1">
//                     <strong>Price:</strong> ${parseFloat(item.sellingPrice).toFixed(2)}
//                   </p>
//                   <p className={`card-text mb-2 ${lowStock ? "text-danger" : ""}`}>
//                     <strong>Stock:</strong> {item.quantityInStock}{" "}
//                     {lowStock && <Badge bg="danger">Low</Badge>}
//                   </p>

//                   <Button
//                     variant="link"
//                     className="mt-auto p-0"
//                     onClick={() => openModal(item)}
//                   >
//                     View Details &gt;
//                   </Button>

//                   <Button
//                     variant="success"
//                     size="sm"
//                     className="mt-2"
//                     onClick={() => openSaleModal(item)}
//                     disabled={item.quantityInStock === 0}
//                   >
//                     Record Sale
//                   </Button>
//                 </div>
//               </div>
//             </Col>
//           );
//         })}
//       </Row>

//       {/* Item Details Modal */}
//       <Modal show={showModal} onHide={closeModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedItem?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedItem && (
//             <>
//               <p><strong>Category:</strong> {selectedItem.category}</p>
//               <p><strong>Brand:</strong> {selectedItem.brand}</p>
//               <p><strong>Cost Price:</strong> ${parseFloat(selectedItem.costPrice).toFixed(2)}</p>
//               <p><strong>Selling Price:</strong> ${parseFloat(selectedItem.sellingPrice).toFixed(2)}</p>
//               <p><strong>Stock:</strong> {selectedItem.quantityInStock}</p>
//               <p><strong>Description:</strong> {selectedItem.description || "N/A"}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>Close</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Record Sale Modal */}
//       <Modal show={showSaleModal} onHide={closeSaleModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Record Sale</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedItem && (
//             <>
//               <p><strong>Item:</strong> {selectedItem.name}</p>
//               <p><strong>Available Stock:</strong> {selectedItem.quantityInStock}</p>

//               <Form.Group>
//                 <Form.Label>Quantity Sold</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   value={saleQuantity}
//                   onChange={(e) => setSaleQuantity(parseInt(e.target.value))}
//                   placeholder="Enter quantity"
//                 />
//               </Form.Group>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeSaleModal}>Cancel</Button>
//           <Button variant="primary" onClick={recordSale}>Confirm Sale</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Navbar, Nav, Breadcrumb } from "react-bootstrap";
// import { FaBoxes, FaChartBar, FaDollarSign, FaExclamationTriangle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function SalesDashboard() {
//   const navigate = useNavigate();
//   const role = localStorage.getItem("role") || "USER";

//   const [stats, setStats] = useState({ totalSales: 0, totalTransactions: 0, lowStock: 0 });

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const res = await api.get("/api/items"); // you can adjust endpoints
//       const items = res.data;

//       const totalSales = items.reduce((sum, item) => sum + parseFloat(item.sellingPrice || 0) * (parseFloat(item.quantitySold || 0)), 0);
//       const totalTransactions = items.reduce((sum, item) => sum + (parseInt(item.transactions || 0)), 0);
//       const lowStock = items.filter((item) => item.quantityInStock < 5).length;

//       setStats({ totalSales, totalTransactions, lowStock });
//     } catch (err) {
//       console.error("Error fetching stats:", err);
//     }
//   };

//   return (
//     <>
//       {/* Header */}
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand>Reception Dashboard</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link onClick={() => navigate("/salesDashboard")}>Home</Nav.Link>
//               <Nav.Link onClick={() => navigate("/itemPage")}>Items</Nav.Link>
//               <Nav.Link onClick={() => navigate("/itemSearchPage")}>Search Items</Nav.Link>
//               <Nav.Link onClick={() => navigate("/settings")}>Settings</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Main content */}
//       <div
//         style={{
//           minHeight: "75vh",
//           background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
//           paddingTop: "40px",
//           paddingBottom: "40px",
//         }}
//       >
//         <Container>
//           {/* Breadcrumb */}
//           <Breadcrumb>
//             <Breadcrumb.Item active>Home</Breadcrumb.Item>
//             <Breadcrumb.Item active>Overview</Breadcrumb.Item>
//           </Breadcrumb>

//           <h2 className="text-center mb-4">🏠Home – Overview</h2>
//           <p className="text-center text-muted mb-5">
//             Welcome! Monitor sales, track transactions, and manage items efficiently.
//           </p>

//           {/* Summary Statistics */}
//           <Row className="mb-5 g-4">
//             <Col xs={12} md={4}>
//               <Card className="shadow-sm text-center">
//                 <Card.Body>
//                   <FaDollarSign size={40} className="mb-2 text-success" />
//                   <Card.Title>Total Sales</Card.Title>
//                   <h3>${stats.totalSales.toFixed(2)}</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col xs={12} md={4}>
//               <Card className="shadow-sm text-center">
//                 <Card.Body>
//                   <FaChartBar size={40} className="mb-2 text-primary" />
//                   <Card.Title>Total Transactions</Card.Title>
//                   <h3>{stats.totalTransactions}</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//             <Col xs={12} md={4}>
//               <Card className="shadow-sm text-center">
//                 <Card.Body>
//                   <FaExclamationTriangle size={40} className="mb-2 text-danger" />
//                   <Card.Title>Low Stock Items</Card.Title>
//                   <h3>{stats.lowStock}</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* Action Cards */}
//           <Row className="g-4">
//             {/* Items Card */}
//             <Col xs={12} md={6}>
//               <Card className="shadow-sm h-100 hover-shadow">
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   <FaBoxes size={50} className="mb-3 text-primary" />
//                   <Card.Title>Manage Items</Card.Title>
//                   <Card.Text className="text-center">
//                     Add or update items for daily sales.
//                   </Card.Text>
//                   <Button variant="primary" onClick={() => navigate("/itemPage")}>
//                     Go to Items
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Search Card */}
//             <Col xs={12} md={6}>
//               <Card className="shadow-sm h-100 hover-shadow">
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   <FaChartBar size={50} className="mb-3 text-success" />
//                   <Card.Title>Search Items</Card.Title>
//                   <Card.Text className="text-center">
//                     Quickly search items to process sales or check availability.
//                   </Card.Text>
//                   <Button variant="success" onClick={() => navigate("/itemSearchPage")}>
//                     Search Items
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Footer */}
//       <footer className="bg-dark text-light py-4 mt-5">
//         <Container className="text-center">
//           <p className="mb-2">&copy; {new Date().getFullYear()} Sales Dashboard. All rights reserved.</p>
//           <p className="mb-0">
//             Monitor sales, manage items, and provide efficient reception operations.
//           </p>
//         </Container>
//       </footer>
//     </>
//   );
// }
/* eslint-disable no-console */
// import { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Navbar, Nav, Breadcrumb } from "react-bootstrap";
// import { FaBoxes, FaChartBar, FaDollarSign, FaExclamationTriangle } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function SalesDashboard() {
//   const navigate = useNavigate();
//   //const role = localStorage.getItem("role") || "USER";

//   const [stats, setStats] = useState({
//     totalSales: 0,
//     totalTransactions: 0,
//     lowStock: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get("/items");
//         const items = res.data || [];

//         const totalSales = items.reduce(
//           (sum, item) => sum + parseFloat(item.sellingPrice || 0) * (parseFloat(item.quantitySold || 0)),
//           0
//         );

//         const totalTransactions = items.reduce(
//           (sum, item) => sum + (parseInt(item.transactions || 0)),
//           0
//         );

//         const lowStock = items.filter((item) => parseInt(item.quantityInStock || 0) < 5).length;

//         setStats({ totalSales, totalTransactions, lowStock });
//       } catch (err) {
//         console.error("Error fetching stats:", err);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <>
//       {/* Header */}
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand>Sales Dashboard</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="ms-auto">
//               <Nav.Link onClick={() => navigate("/salesDashboard")}>Home</Nav.Link>
//               {/* <Nav.Link onClick={() => navigate("/itemPage")}>Items</Nav.Link> */}
//               {/* <Nav.Link onClick={() => navigate("/reportPage")}>Reports</Nav.Link> */}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Main Content */}
//       <div
//         style={{
//           minHeight: "75vh",
//           background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
//           paddingTop: "40px",
//           paddingBottom: "40px",
//         }}
//       >
//         <Container>
//           <Breadcrumb>
//             <Breadcrumb.Item active>Home</Breadcrumb.Item>
//             <Breadcrumb.Item active>Overview</Breadcrumb.Item>
//           </Breadcrumb>

//           <h2 className="text-center mb-4">🛒 Sales Dashboard – Overview</h2>
//           <p className="text-center text-muted mb-5">
//             Monitor sales, track transactions, and keep an eye on low stock items.
//           </p>

//           {/* Summary Statistics */}
//           <Row className="mb-5 g-4">
//             <Col xs={12} md={4}>
//               <Card className="shadow-sm text-center">
//                 <Card.Body>
//                   <FaDollarSign size={40} className="mb-2 text-success" />
//                   <Card.Title>Total Sales</Card.Title>
//                   <h3>${stats.totalSales.toFixed(2)}</h3>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xs={12} md={4}>
//               <Card className="shadow-sm text-center">
//                 <Card.Body>
//                   <FaChartBar size={40} className="mb-2 text-primary" />
//                   <Card.Title>Total Transactions</Card.Title>
//                   <h3>{stats.totalTransactions}</h3>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col xs={12} md={4}>
//               <Card className="shadow-sm text-center">
//                 <Card.Body>
//                   <FaExclamationTriangle size={40} className="mb-2 text-danger" />
//                   <Card.Title>Low Stock Items</Card.Title>
//                   <h3>{stats.lowStock}</h3>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>

//           {/* Action Cards */}
//           <Row className="g-4">
//             {/* Items Card */}
//             <Col xs={12} md={6}>
//               <Card className="shadow-sm h-100 hover-shadow">
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   <FaBoxes size={50} className="mb-3 text-primary" />
//                   <Card.Title>View Items</Card.Title>
//                   <Card.Text className="text-center">
//                     Browse your inventory and manage stock levels.
//                   </Card.Text>
//                   <Button variant="primary" onClick={() => navigate("/itemPage")}>
//                     Go to Items
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>

//             {/* Reports Card */}
//             <Col xs={12} md={6}>
//               <Card className="shadow-sm h-100 hover-shadow">
//                 <Card.Body className="d-flex flex-column justify-content-center align-items-center">
//                   <FaChartBar size={50} className="mb-3 text-success" />
//                   <Card.Title>View Reports</Card.Title>
//                   <Card.Text className="text-center">
//                     Check profit, sales trends, and performance metrics.
//                   </Card.Text>
//                   <Button variant="success" onClick={() => navigate("/reportPage")}>
//                     Go to Reports
//                   </Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       {/* Footer */}
//       {/* <footer className="bg-dark text-light py-4 mt-5">
//         <Container className="text-center">
//           <p className="mb-2">&copy; {new Date().getFullYear()} Sales Dashboard. All rights reserved.</p>
//           <p className="mb-0">
//             This dashboard helps you monitor sales, transactions, and inventory efficiently.
//           </p>
//         </Container>
//       </footer> */}
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, Breadcrumb } from "react-bootstrap";
import { FaDollarSign, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function SalesDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalSales: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/items");
        const items = res.data || [];

        const totalSales = items.reduce(
          (sum, item) => sum + parseFloat(item.sellingPrice || 0) * parseFloat(item.quantitySold || 0),
          0
        );

        const lowStock = items.filter((item) => parseInt(item.quantityInStock || 0) < 5).length;

        setStats({ totalSales, lowStock });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

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

      {/* Main Content */}
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

          <h2 className="text-center mb-4">🛒 Sales Dashboard – Overview</h2>
          <p className="text-center text-muted mb-5">
            Track your sales and monitor low stock items in real time.
          </p>

          {/* Summary Statistics */}
          <Row className="mb-5 g-4">
            <Col xs={12} md={6}>
              <Card className="shadow-sm text-center">
                <Card.Body>
                  <FaDollarSign size={40} className="mb-2 text-success" />
                  <Card.Title>Total Sales</Card.Title>
                  <h3>${stats.totalSales.toFixed(2)}</h3>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6}>
              <Card className="shadow-sm text-center">
                <Card.Body>
                  <FaExclamationTriangle size={40} className="mb-2 text-danger" />
                  <Card.Title>Low Stock Items</Card.Title>
                  <h3>{stats.lowStock}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Action Buttons */}
          <Row className="g-4">
            <Col xs={12} md={4}>
              <Button variant="primary" className="w-100" onClick={() => navigate("/saleForm")}>
                ➕ Record Sale
              </Button>
            </Col>
            <Col xs={12} md={4}>
              <Button variant="success" className="w-100" onClick={() => navigate("/easyManageSales")}>
                💰 Easy Manage Sales
              </Button>
            </Col>
            <Col xs={12} md={4}>
              <Button variant="secondary" className="w-100" onClick={() => navigate("/settings")}>
                ⚙️ Settings
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

// import { useState, useEffect } from "react";
// import { Row, Col, Button, Badge, Modal, Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function SalesDashboard() {
//   const [items, setItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [showSaleModal, setShowSaleModal] = useState(false);
//   const [saleQuantity, setSaleQuantity] = useState("");
//   const role = localStorage.getItem("role") || "USER"; // now used
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   const fetchItems = async () => {
//     try {
//       const response = await api.get("/items");
//       setItems(response.data);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//     }
//   };

//   const openModal = (item) => {
//     setSelectedItem(item);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedItem(null);
//     setShowModal(false);
//   };

//   const openSaleModal = (item) => {
//     setSelectedItem(item);
//     setSaleQuantity("");
//     setShowSaleModal(true);
//   };

//   const closeSaleModal = () => {
//     setShowSaleModal(false);
//     setSelectedItem(null);
//   };

//   const recordSale = async () => {
//     if (!saleQuantity || saleQuantity <= 0) return alert("Enter valid quantity");
//     if (saleQuantity > selectedItem.quantityInStock)
//       return alert("Not enough stock for this sale");

//     try {
//       await api.post(`/sales`, {
//         itemId: selectedItem.id,
//         quantity: saleQuantity,
//       });

//       const updated = items.map((item) =>
//         item.id === selectedItem.id
//           ? { ...item, quantityInStock: item.quantityInStock - saleQuantity }
//           : item
//       );
//       setItems(updated);
//       closeSaleModal();
//     } catch (error) {
//       console.error("Error recording sale:", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Sales Dashboard</h2>

//       {/* Easy Manage Sales button for Reception */}
//       {role === "RECEPTION" && (
//         <div className="mb-3">
//           <Button
//             variant="primary"
//             onClick={() => navigate("/easyManageSales")}
//           >
//             Easy Manage Sales
//           </Button>
//         </div>
//       )}

//       {/* Cards Layout */}
//       <Row>
//         {items.map((item) => {
//           const lowStock = item.quantityInStock < 5;
//           return (
//             <Col key={item.id} xs={12} md={3} className="mb-3">
//               <div className="card h-100 shadow-sm">
//                 <div className="card-body d-flex flex-column">
//                   <h5 className="card-title">{item.name}</h5>
//                   <p className="card-text">{item.category} • {item.brand}</p>
//                   <p className="card-text mb-1">
//                     <strong>Price:</strong> ${parseFloat(item.sellingPrice).toFixed(2)}
//                   </p>
//                   <p className={`card-text mb-2 ${lowStock ? "text-danger" : ""}`}>
//                     <strong>Stock:</strong> {item.quantityInStock}{" "}
//                     {lowStock && <Badge bg="danger">Low</Badge>}
//                   </p>

//                   <Button
//                     variant="link"
//                     className="mt-auto p-0"
//                     onClick={() => openModal(item)}
//                   >
//                     View Details &gt;
//                   </Button>

//                   <Button
//                     variant="success"
//                     size="sm"
//                     className="mt-2"
//                     onClick={() => openSaleModal(item)}
//                     disabled={item.quantityInStock === 0}
//                   >
//                     Record Sale
//                   </Button>
//                 </div>
//               </div>
//             </Col>
//           );
//         })}
//       </Row>

//       {/* Item Details Modal */}
//       <Modal show={showModal} onHide={closeModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{selectedItem?.name}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedItem && (
//             <>
//               <p><strong>Category:</strong> {selectedItem.category}</p>
//               <p><strong>Brand:</strong> {selectedItem.brand}</p>
//               <p><strong>Cost Price:</strong> ${parseFloat(selectedItem.costPrice).toFixed(2)}</p>
//               <p><strong>Selling Price:</strong> ${parseFloat(selectedItem.sellingPrice).toFixed(2)}</p>
//               <p><strong>Stock:</strong> {selectedItem.quantityInStock}</p>
//               <p><strong>Description:</strong> {selectedItem.description || "N/A"}</p>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>Close</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Record Sale Modal */}
//       <Modal show={showSaleModal} onHide={closeSaleModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Record Sale</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedItem && (
//             <>
//               <p><strong>Item:</strong> {selectedItem.name}</p>
//               <p><strong>Available Stock:</strong> {selectedItem.quantityInStock}</p>

//               <Form.Group>
//                 <Form.Label>Quantity Sold</Form.Label>
//                 <Form.Control
//                   type="number"
//                   min="1"
//                   value={saleQuantity}
//                   onChange={(e) => setSaleQuantity(parseInt(e.target.value))}
//                   placeholder="Enter quantity"
//                 />
//               </Form.Group>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeSaleModal}>Cancel</Button>
//           <Button variant="primary" onClick={recordSale}>Confirm Sale</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
