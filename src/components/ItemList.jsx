import React from "react";
import { Card, Row, Col } from "react-bootstrap";

export default function ItemList({ items }) {
  if (!items || items.length === 0) {
    return <p className="text-muted">No items added yet.</p>;
  }

  return (
    <Row>
      {items.map((item, index) => (
        <Col md={3} key={index} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {item.category} | {item.brand}
              </Card.Subtitle>
              <Card.Text>
                <strong>Cost:</strong> ${Number(item.costPrice).toFixed(2)} <br />
                <strong>Selling:</strong> ${Number(item.sellingPrice).toFixed(2)} <br />
                <strong>Stock:</strong> {item.quantityInStock} <br />
                <small className="text-muted">
                  Added: {new Date(item.createdAt).toLocaleString()}
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
