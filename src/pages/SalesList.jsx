
import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Badge, Spinner, Alert, Navbar, Nav } from "react-bootstrap";
import api from "../api";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaDollarSign, FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SalesList() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "USER";

  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await api.get("/sales");
      setSales(res.data);
      setFilteredSales(res.data);
    } catch (err) {
      console.error("Error fetching sales:", err);
      setError("Failed to load sales data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredSales(
      sales.filter(
        (sale) =>
          sale.item?.name.toLowerCase().includes(term) ||
          sale.id.toString().includes(term)
      )
    );
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sales Report");

    sheet.addRow(["ID", "Item", "Quantity Sold", "Selling Price", "Total Value", "Sale Date"]);
    const headerRow = sheet.lastRow;
    headerRow.font = { bold: true };
    headerRow.eachCell((cell) => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDEEAF6" } };
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      cell.alignment = { horizontal: "center" };
    });

    filteredSales.forEach((sale) => {
      sheet.addRow([
        sale.id,
        sale.item?.name,
        sale.quantitySold,
        `$${parseFloat(sale.item?.sellingPrice || 0).toFixed(2)}`,
        `$${(sale.quantitySold * (sale.item?.sellingPrice || 0)).toFixed(2)}`,
        new Date(sale.saleDate).toLocaleString(),
      ]);
    });

    sheet.columns.forEach((col) => {
      let maxLength = 0;
      col.eachCell({ includeEmpty: true }, (cell) => {
        const length = cell.value ? cell.value.toString().length : 10;
        if (length > maxLength) maxLength = length;
      });
      col.width = maxLength < 20 ? 20 : maxLength;
    });

    const bufferOut = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([bufferOut]), "SalesReport.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Sales Report", 14, 20);
    doc.setFontSize(10);

    const tableColumn = ["ID", "Item", "Quantity Sold", "Selling Price", "Total Value", "Sale Date"];
    const tableRows = [];

    filteredSales.forEach((sale) => {
      const row = [
        sale.id,
        sale.item?.name,
        sale.quantitySold,
        `$${parseFloat(sale.item?.sellingPrice || 0).toFixed(2)}`,
        `$${(sale.quantitySold * (sale.item?.sellingPrice || 0)).toFixed(2)}`,
        new Date(sale.saleDate).toLocaleString(),
      ];
      tableRows.push(row);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "striped",
      headStyles: { fillColor: [222, 234, 246] },
    });

    doc.save("SalesReport.pdf");
  };

  if (loading) return <Spinner animation="border" className="mt-5 d-block mx-auto" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Sales Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/homePage")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/itemPage")}>Items</Nav.Link>
              <Nav.Link onClick={() => navigate("/reportPage")}>Reports</Nav.Link>
              {role === "MANAGER" && <Nav.Link onClick={() => navigate("/users")}>Users</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <h2 className="mb-4 text-center">📊 Sales List</h2>

        {/* Summary Cards */}
        <div className="d-flex justify-content-between mb-4 flex-wrap">
          <div className="card text-white bg-primary mb-3" style={{ width: "18rem" }}>
            <div className="card-body d-flex align-items-center">
              <FaShoppingCart size={24} className="me-2" />
              <div>
                <h5 className="card-title">Total Sales</h5>
                <p className="card-text fs-4">{filteredSales.length}</p>
              </div>
            </div>
          </div>

          <div className="card text-white bg-success mb-3" style={{ width: "18rem" }}>
            <div className="card-body d-flex align-items-center">
              <FaDollarSign size={24} className="me-2" />
              <div>
                <h5 className="card-title">Total Revenue</h5>
                <p className="card-text fs-4">
                  ${filteredSales.reduce((sum, sale) => sum + sale.quantitySold * (sale.item?.sellingPrice || 0), 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="card text-white bg-danger mb-3" style={{ width: "18rem" }}>
            <div className="card-body d-flex align-items-center">
              <FaExclamationTriangle size={24} className="me-2" />
              <div>
                <h5 className="card-title">Low Stock Items</h5>
                <p className="card-text fs-4">
                  {filteredSales.filter((sale) => (sale.item?.quantityInStock || 0) - sale.quantitySold <= 5).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Export */}
        <div className="d-flex justify-content-between mb-3 flex-wrap">
          <Form.Control
            type="text"
            placeholder="Search by item name or ID..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "300px", marginBottom: "10px" }}
          />
          <div>
            <Button onClick={exportToExcel} variant="success" className="me-2 mb-2">Export to Excel</Button>
            <Button onClick={exportToPDF} variant="danger" className="mb-2">Export to PDF</Button>
          </div>
        </div>

        {/* Sales Table */}
        <Table striped bordered hover responsive className="table-light">
          <thead className="table-secondary">
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Quantity Sold</th>
              <th>Selling Price</th>
              <th>Total Value</th>
              <th>Sale Date</th>
              <th>Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => {
              const lowStock = (sale.item?.quantityInStock || 0) - sale.quantitySold <= 5;
              return (
                <tr key={sale.id}>
                  <td>{sale.id}</td>
                  <td>{sale.item?.name}</td>
                  <td>{sale.quantitySold}</td>
                  <td>${parseFloat(sale.item?.sellingPrice || 0).toFixed(2)}</td>
                  <td>${(sale.quantitySold * (sale.item?.sellingPrice || 0)).toFixed(2)}</td>
                  <td>{new Date(sale.saleDate).toLocaleString()}</td>
                  <td>{lowStock && <Badge bg="danger">Low</Badge>}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
