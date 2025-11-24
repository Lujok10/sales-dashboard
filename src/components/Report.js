import { useEffect, useState } from "react";
import api from "../api";

export default function Report() {
  const [report, setReport] = useState({});

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      // const res = await api.get("/api/items");
      const response = await api.get("/sales/report");
      setReport(response.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Profit Report</h2>
      <div className="card p-3">
        <p><strong>Total Sales:</strong> {report.totalSales}</p>
        <p><strong>Total Profit:</strong> {report.totalProfit}</p>
        <p><strong>Total Items Sold:</strong> {report.totalItems}</p>
      </div>
    </div>
  );
}

