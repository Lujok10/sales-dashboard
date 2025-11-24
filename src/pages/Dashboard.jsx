
import { useState, useEffect } from "react";
import { Row, Col, Button, Badge, Table, Modal } from "react-bootstrap";
import api from "../api";
import colaImage from "../assets/Cola-Coca.jpg"; // import image directly

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const deleteItem = async (id) => {
    try {
      await api.delete(`/items/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Inventory Dashboard</h2>

      {/* Cards layout */}
      <Row className="mb-4">
        {items.map((item) => {
          const lowStock = item.quantityInStock < 5;
          return (
            <Col key={item.id} xs={12} md={3} className="mb-3">
              <div className="card h-100 shadow-sm">
                {/* Card Image */}
                <img
                  src={colaImage}
                  alt={item.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px", width: "100%" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    {item.category} • {item.brand}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Cost:</strong> $
                    {parseFloat(item.costPrice).toFixed(2)}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Selling:</strong> $
                    {parseFloat(item.sellingPrice).toFixed(2)}
                  </p>
                  <p className={`card-text mb-2 ${lowStock ? "text-danger" : ""}`}>
                    <strong>Stock:</strong> {item.quantityInStock}{" "}
                    {lowStock && <Badge bg="danger">Low</Badge>}
                  </p>
                  <Button
                    variant="link"
                    className="mt-auto p-0"
                    onClick={() => openModal(item)}
                  >
                    Find out more &gt;
                  </Button>
                  {role === "MANAGER" && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* Manager table reporting */}
      {role === "MANAGER" && (
        <div className="mt-5">
          <h4>Inventory Report</h4>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Cost Price</th>
                <th>Selling Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.brand}</td>
                  <td>${parseFloat(item.costPrice).toFixed(2)}</td>
                  <td>${parseFloat(item.sellingPrice).toFixed(2)}</td>
                  <td>{item.quantityInStock}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal for item details */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedItem?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <img
                src={colaImage}
                alt={selectedItem.name}
                className="img-fluid mb-3"
                style={{ objectFit: "cover", height: "200px", width: "100%" }}
              />
              <p>
                <strong>Category:</strong> {selectedItem.category}
              </p>
              <p>
                <strong>Brand:</strong> {selectedItem.brand}
              </p>
              <p>
                <strong>Cost Price:</strong> $
                {parseFloat(selectedItem.costPrice).toFixed(2)}
              </p>
              <p>
                <strong>Selling Price:</strong> $
                {parseFloat(selectedItem.sellingPrice).toFixed(2)}
              </p>
              <p>
                <strong>Stock:</strong> {selectedItem.quantityInStock}
              </p>
              <p>
                <strong>Description:</strong> {selectedItem.description || "N/A"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

