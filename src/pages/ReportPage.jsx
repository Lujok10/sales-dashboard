
import { useEffect, useState } from "react";
import { Container, Card, Table, Spinner, Alert, Button, Navbar, Nav } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { FaChartPie, FaFileExcel } from "react-icons/fa";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function ReportPage() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "USER";

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await api.get("/sales/report");
      setReport(res.data);
    } catch (err) {
      console.error("Error fetching report:", err);
      setError("Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = async () => {
    const { default: ExcelJS } = await import("exceljs");
    const { saveAs } = await import("file-saver");

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Profit Report");

    // Title row
    sheet.mergeCells("A1:B1");
    sheet.getCell("A1").value = "Profit Report";
    sheet.getCell("A1").font = { size: 16, bold: true };
    sheet.getCell("A1").alignment = { vertical: "middle", horizontal: "center" };

    // Timestamp
    sheet.mergeCells("C1:D1");
    sheet.getCell("C1").value = `Generated: ${new Date().toLocaleString()}`;
    sheet.getCell("C1").font = { size: 10, italic: true };
    sheet.getCell("C1").alignment = { vertical: "middle", horizontal: "right" };

    // Spacing
    sheet.addRow([]);
    sheet.addRow([]);

    // Table headers
    sheet.addRow(["Metric", "Value"]);
    const headerRow = sheet.lastRow;
    headerRow.font = { bold: true };
    headerRow.alignment = { horizontal: "center" };
    headerRow.eachCell((cell) => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDEEAF6" } };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Data rows
    Object.entries(report).forEach(([key, value]) => {
      sheet.addRow([key, typeof value === "number" ? value : String(value)]);
    });

    // Autofit columns
    sheet.columns.forEach((col) => {
      let maxLength = 0;
      col.eachCell({ includeEmpty: true }, (cell) => {
        const length = cell.value ? cell.value.toString().length : 10;
        if (length > maxLength) maxLength = length;
      });
      col.width = maxLength < 20 ? 20 : maxLength;
    });

    const bufferOut = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([bufferOut]), "ProfitReport.xlsx");
  };

  if (loading) return <Spinner animation="border" className="mt-5 d-block mx-auto" />;
  if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

  const chartData = Object.entries(report).map(([key, value]) => ({
    metric: key,
    value: typeof value === "number" ? value : 0,
  }));

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
        {/* Header */}
        <div className="d-flex align-items-center mb-4">
          <FaChartPie size={30} className="me-2 text-primary" />
          <h2 className="mb-0">Profit Report</h2>
          <Button className="ms-auto" onClick={exportToExcel} variant="success">
            <FaFileExcel className="me-2" /> Export Excel
          </Button>
        </div>

        {/* Bar Chart */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-info text-white fw-bold">Profit Chart</Card.Header>
          <Card.Body>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Profit/Loss"
                  label={{ position: "top", formatter: (value) => `$${value.toFixed(2)}` }}
                >
                  {chartData.map((entry, index) => {
                    let fillColor = "#6c757d"; // gray default
                    if (entry.value > 0) fillColor = "#28a745"; // green
                    else if (entry.value < 0) fillColor = "#dc3545"; // red
                    return <Cell key={`cell-${index}`} fill={fillColor} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card.Body>
        </Card>

        {/* Table */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-info text-white fw-bold">Profit Table</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <tbody>
                {Object.entries(report).map(([key, value]) => {
                  let colorClass = "";
                  if (typeof value === "number") {
                    if (value > 0) colorClass = "text-success";
                    else if (value < 0) colorClass = "text-danger";
                    else colorClass = "text-secondary";
                  }
                  return (
                    <tr key={key}>
                      <td className="fw-bold text-capitalize">{key}</td>
                      <td className={colorClass}>
                        {typeof value === "number" ? `$${value.toFixed(2)}` : String(value)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
