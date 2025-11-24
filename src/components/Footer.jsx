
import React from "react";

export default function Footer({ tenant }) {
  return (
    <footer
      className="py-3 mt-5"
      style={{
        backgroundColor: "#343a40", // dark grey to differ from sidebar
        color: "#f8f9fa",
        boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.3)", // subtle separation shadow
      }}
    >
      <div className="container text-center">
        <p className="mb-1">
          &copy; {new Date().getFullYear()} {tenant?.companyName || "NSAA Systems"}. All rights reserved.
        </p>

        <small className="text-muted">
          This dashboard helps track inventory, sales, and profit reports in real time.
        </small>
      </div>
    </footer>
  );
}
