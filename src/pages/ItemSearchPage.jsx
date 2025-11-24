

import { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";

// preload all images from assets/images
const images = require.context("../assets/images", false, /\.(png|jpe?g|svg)$/);

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

export default function ItemSearchPage() {
  const [searchType, setSearchType] = useState("id");
  const [query, setQuery] = useState("");
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setItem(null);

    try {
      let res;
      if (searchType === "id") {
        //res = await api.get(`/api/items/${query}`);
         res = await api.get(`/items/${query}`);
      } else {
        //res = await api.get(`/api/items/search?name=${query}`);
        res = await api.get(`/items/search?name=${query}`);
      }
      setItem(res.data);
    } catch (err) {
      console.error("Error fetching item:", err);
      setError("Item not found. Please check your search.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">
            Inventory App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Content */}
      <Container className="mt-4">
        <h2 className="mb-4 text-center text-primary">
          <FaSearch className="me-2" />
          Item Search
        </h2>

        {/* Search Form */}
        <Form onSubmit={handleSearch} className="mb-4">
          <Row className="align-items-center">
            <Col xs={12} md={3}>
              <Form.Select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="id">Search by ID</option>
                <option value="name">Search by Name</option>
              </Form.Select>
            </Col>
            <Col xs={12} md={6}>
              <Form.Control
                type="text"
                placeholder={`Enter item ${searchType}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Col>
            <Col xs={12} md={3} className="d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" animation="border" /> : "Search"}
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Error */}
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {/* Item Result */}
        {item && (
          <Card className="shadow-sm mt-4">
            <Row className="g-0">
              {/* Image on left */}
              <Col
                md={4}
                className="d-flex align-items-center justify-content-center p-3"
              >
                <img
                  src={getImage(item.name)}
                  alt={item.name}
                  className="img-fluid rounded"
                  style={{ objectFit: "cover", height: "200px", width: "100%" }}
                />
              </Col>

              {/* Details on right */}
              <Col md={8}>
                <Card.Body>
                  <h4>{item.name}</h4>
                  <p>
                    <strong>ID:</strong> {item.id}
                  </p>
                  <p>
                    <strong>Cost Price:</strong> $
                    {Number(item.costPrice).toFixed(2)}
                  </p>
                  <p>
                    <strong>Selling Price:</strong> $
                    {Number(item.sellingPrice).toFixed(2)}
                  </p>
                  <p>
                    <strong>Quantity in Stock:</strong> {item.quantityInStock}
                  </p>
                  <p>
                    <strong>Category:</strong> {item.category || "N/A"}
                  </p>
                  <p>
                    <strong>Brand:</strong> {item.brand || "N/A"}
                  </p>

                  <Button
                    variant="outline-primary"
                    onClick={() => navigate(`/items/${item.id}`)}
                  >
                    View Details →
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        )}
      </Container>

      {/* Footer */}
      {/* <footer className="bg-dark text-light py-3 mt-5">
        <div className="container text-center">
          <p className="mb-1">
            The item search feature allows you to quickly find products by
            either their unique ID or name. Click on “View Details” to see full
            product information including pricing, stock levels, and category.
          </p>
          <small>&copy; 2025 Inventory App. All rights reserved.</small>
        </div>
      </footer> */}
    </>
  );
}
