

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import ManagerDashboard from "./pages/ManagerDashboard";
import SalesDashboard from "./pages/SalesDashboard";
import Inventory from "./pages/Inventory";
import ItemPage from "./pages/ItemPage";
import ReportPage from "./pages/ReportPage";
import SaleForm from "./pages/SaleForm";
import SalesList from "./pages/SalesList";
import Settings from "./pages/Settings";
import LoginPage from "./pages/LoginPage";
import EasyManageSales from "./pages/EasyManageSales";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";

function App() {
  const location = useLocation();
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  
  // tenant state with setTenant
  const [tenant, setTenant] = useState({ companyName: "NSAA Systems" });

  // Sync role across tabs + login/logout
  useEffect(() => {
    const syncRole = () => setRole(localStorage.getItem("role") || "");
    window.addEventListener("roleChanged", syncRole);
    window.addEventListener("storage", syncRole);
    return () => {
      window.removeEventListener("roleChanged", syncRole);
      window.removeEventListener("storage", syncRole);
    };
  }, []);

  // Update tenant after login (listen for custom event)
  useEffect(() => {
    const handleTenantUpdate = (e) => {
      const newTenant = e.detail?.tenant;
      if (newTenant) setTenant(newTenant);
    };
    window.addEventListener("tenantChanged", handleTenantUpdate);
    return () => window.removeEventListener("tenantChanged", handleTenantUpdate);
  }, []);

  // Hide header/footer/sidebar on auth pages
  const authPages = ["/loginPage", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  const sidebarTitle = `${tenant?.companyName || "NSAA Systems"} Dashboard`;

  return (
    <>
      {!isAuthPage && <Header tenant={tenant} title={role ? `${role} Dashboard` : ""} />}

      <div className="d-flex vh-100">
        {!isAuthPage && role && (
          <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
            <h4>{sidebarTitle}</h4>
            <ul className="nav flex-column mt-4">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  🏠 Dashboard
                </Link>
              </li>

              {role === "MANAGER" && (
                <>
                  <li className="nav-item">
                    <Link to="/inventory" className="nav-link text-white">
                      📦 Inventory
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/salesList" className="nav-link text-white">
                      📑 Sales List
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/reportPage" className="nav-link text-white">
                      📊 Profit Report
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/saleForm" className="nav-link text-white">
                      ➕ Record Sale
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/itemPage" className="nav-link text-white">
                      🛒 Item Page
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link text-white">
                      ⚙️ Settings
                    </Link>
                  </li>
                </>
              )}
                return <TestLoginButton />;
                
              {role === "RECEPTION" && (
                <>
                  <li className="nav-item">
                    <Link to="/salesDashboard" className="nav-link text-white">
                      🛒 Sales Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/saleForm" className="nav-link text-white">
                      ➕ Record Sale
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/easyManageSales" className="nav-link text-white">
                      💰 Easy Manage Sales
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link text-white">
                      ⚙️ Settings
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link
                  to="/loginPage"
                  className="nav-link text-white"
                  onClick={() => {
                    localStorage.clear();
                    setRole("");
                    setTenant({ companyName: "NSAA Systems" }); // reset to default
                    window.dispatchEvent(new Event("roleChanged"));
                  }}
                >
                  🔑 Logout
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="flex-grow-1 overflow-auto">
          <div className={isAuthPage ? "" : "container mt-4 mb-5"}>
            <Routes>
              <Route
                path="/"
                element={
                  role === "MANAGER" ? (
                    <ManagerDashboard />
                  ) : role === "RECEPTION" ? (
                    <SalesDashboard />
                  ) : (
                    <Navigate to="/loginPage" replace />
                  )
                }
              />
              <Route path="/loginPage" element={<LoginPage setTenant={setTenant} />} />
              <Route path="/register" element={<Register setTenant={setTenant} />} />

              {role === "MANAGER" && (
                <>
                  <Route path="/inventory" element={<Inventory />} />
                  <Route path="/salesList" element={<SalesList />} />
                  <Route path="/reportPage" element={<ReportPage />} />
                  <Route path="/saleForm" element={<SaleForm />} />
                  <Route path="/itemPage" element={<ItemPage />} />
                  <Route path="/settings" element={<Settings />} />
                </>
              )}

              {role === "RECEPTION" && (
                <>
                  <Route path="/salesDashboard" element={<SalesDashboard />} />
                  <Route path="/saleForm" element={<SaleForm />} />
                  <Route path="/easyManageSales" element={<EasyManageSales />} />
                  <Route path="/settings" element={<Settings />} />
                </>
              )}

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>

      {!isAuthPage && <Footer tenant={tenant} />}
    </>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
