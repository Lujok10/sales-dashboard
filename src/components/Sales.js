
import React, { useState, useEffect } from "react";
import { Button, Table, Container, Card, Row, Col } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { format, parseISO, isValid } from "date-fns";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Safe date formatter
const safeFormatDate = (dateStr, pattern = "yyyy-MM-dd") => {
  if (!dateStr) return "N/A";
  const parsed = parseISO(dateStr);
  return isValid(parsed) ? format(parsed, pattern) : "N/A";
};

// Define colors per category
const categoryColors = {
  Beverages: "rgba(54, 162, 235, 0.6)",
  Snacks: "rgba(75, 192, 192, 0.6)",
  Dairy: "rgba(255, 206, 86, 0.6)",
  Default: "rgba(153, 102, 255, 0.6)",
};

export default function Sales() {
  const [sales, setSales] = useState([]);

  // Fetch sales from API
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("http://localhost:9001/api/sales");
        const data = await res.json();
        setSales(data);
      } catch (err) {
        console.error("Error fetching sales:", err);
      }
    };
    fetchSales();
  }, []);

  // =====================
  // Chart Data by Category
  // =====================
  const salesByCategory = sales.reduce((acc, sale) => {
    const category = sale.item?.category || "Default";
    acc[category] = (acc[category] || 0) + sale.quantitySold;
    return acc;
  }, {});

  const chartCategoryData = {
    labels: Object.keys(salesByCategory),
    datasets: [
      {
        label: "Quantity Sold by Category",
        data: Object.values(salesByCategory),
        backgroundColor: Object.keys(salesByCategory).map(
          (cat) => categoryColors[cat] || categoryColors.Default
        ),
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
      },
    ],
  };

  // =====================
  // Chart Data by Date
  // =====================
  const salesByDate = sales.reduce((acc, sale) => {
    const date = safeFormatDate(sale.saleDate);
    acc[date] = (acc[date] || 0) + (sale.item?.sellingPrice || 0) * sale.quantitySold;
    return acc;
  }, {});

  const chartDateData = {
    labels: Object.keys(salesByDate),
    datasets: [
      {
        label: "Total Sales ($) by Date",
        data: Object.values(salesByDate),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // =====================
  // Export PDF
  // =====================
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 14, 16);
    doc.autoTable({
      startY: 20,
      head: [["ID", "Item", "Quantity Sold", "Selling Price", "Total Value", "Sale Date"]],
      body: sales.map((sale) => [
        sale.id,
        sale.item?.name || "N/A",
        sale.quantitySold,
        `$${sale.item?.sellingPrice?.toFixed(2) || 0}`,
        `$${((sale.item?.sellingPrice || 0) * sale.quantitySold).toFixed(2)}`,
        safeFormatDate(sale.saleDate),
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [222, 234, 246] },
    });
    doc.save("sales-report.pdf");
  };

  // =====================
  // Export Excel
  // =====================
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Sales Report");

    sheet.addRow(["Sales Report"]);
    sheet.getRow(1).font = { bold: true, size: 16 };
    sheet.mergeCells("A1:F1");

    const header = ["ID", "Item", "Quantity Sold", "Selling Price", "Total Value", "Sale Date"];
    sheet.addRow(header);
    sheet.getRow(2).font = { bold: true };
    sheet.getRow(2).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFDEEAF6" },
    };

    sales.forEach((sale) => {
      sheet.addRow([
        sale.id,
        sale.item?.name || "N/A",
        sale.quantitySold,
        sale.item?.sellingPrice || 0,
        (sale.item?.sellingPrice || 0) * sale.quantitySold,
        safeFormatDate(sale.saleDate),
      ]);
    });

    sheet.columns.forEach((col) => {
      let maxLength = 10;
      col.eachCell({ includeEmpty: true }, (cell) => {
        const length = cell.value ? cell.value.toString().length : 10;
        if (length > maxLength) maxLength = length;
      });
      col.width = maxLength < 15 ? 15 : maxLength;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), "sales-report.xlsx");
  };

  return (
    <>
      <Header />

      <Container className="mt-4">
        <h2 className="mb-3 text-center">📊Sales Data</h2>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="p-3 shadow-sm mb-3">
              <Bar data={chartCategoryData} />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3 shadow-sm mb-3">
              <Bar data={chartDateData} />
            </Card>
          </Col>
        </Row>

        <Card className="p-3 mb-4 shadow-sm">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Quantity Sold</th>
                <th>Selling Price</th>
                <th>Total Value</th>
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => {
                const lowStock = sale.item?.quantityInStock < 5;
                return (
                  <tr key={sale.id}>
                    <td>{sale.id}</td>
                    <td>{sale.item?.name || "N/A"}</td>
                    <td>
                      {sale.quantitySold}{" "}
                      {lowStock && <span className="badge bg-danger">Low</span>}
                    </td>
                    <td>${sale.item?.sellingPrice?.toFixed(2) || 0}</td>
                    <td>${((sale.item?.sellingPrice || 0) * sale.quantitySold).toFixed(2)}</td>
                    <td>{safeFormatDate(sale.saleDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="d-flex gap-2 mt-3">
            <Button variant="primary" onClick={exportToPDF}>
              Export to PDF
            </Button>
            <Button variant="success" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </div>
        </Card>
      </Container>

      {/* <Footer /> */}
    </>
  );
}

