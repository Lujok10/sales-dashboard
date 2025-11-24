
import React from "react";
export default function Header({ tenant, title }) {
  // Default parent info
  const defaultLogo = "/logo.gif";
  const defaultName = "NSAA Systems";
  const defaultTitle = "NSSA Dashboard";

  const logoSrc = tenant?.logo || defaultLogo;
  const companyName = tenant?.companyName || defaultName;
  const displayTitle = title || defaultTitle;

  return (
    <header className="bg-dark text-light py-2 shadow-sm">
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{ height: "60px" }}
      >
        {/* Logo + Company Name */}
        <div className="d-flex align-items-center">
          <img
            src={logoSrc}
            alt="Logo"
            style={{
              width: "45px",
              height: "45px",
              marginRight: "12px",
              objectFit: "contain",
            }}
          />
          <h4 className="mb-0 fw-bold">{companyName}</h4>
        </div>

        {/* Dashboard Title */}
        <span className="fw-semibold">{displayTitle}</span>
      </div>
    </header>
  );
}
