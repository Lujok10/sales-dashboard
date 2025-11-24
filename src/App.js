
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// //import Items from "./components/Items";   // Inventory items
// import ItemPage from "./pages/ItemPage";   // Inventory items
// import SalesList from "./pages/SalesList";
// import ItemDetails from "./pages/ItemDetails";
// // import Report from "./components/Report"; // Sales profit report
// import Settings from "./pages/Settings";
// import Sales from "./components/Sales";
// import ReportPage from "./pages/ReportPage";
// import HomePage from "./pages/HomePage";
// import ItemSearchPage from "./pages/ItemSearchPage";
// import SaleForm from "./pages/SaleForm";
// import Inventory from "./pages/Inventory";
// import LoginPage from "./pages/LoginPage";

// // function Home() {
// //   return <h2>🏠 Home - Overview</h2>;
// // }

// // function Sales() {
// //   return <h2>📊 Sales Data</h2>;
// // }
// // function Sales() {
// //   return <h2>📊 Sales Data</h2>;
// // }
// // function Sales() {
// //   return <h2>📊 Sales Data</h2>;
// // }

// // function Inventory() {
// //   return <h2>📦 Inventory Management</h2>;
// // }

// // function Settings() {
// //   return <h2>⚙️ Settings</h2>;
// // }

// function App() {
//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//           <h4>Dashboard</h4>
//           <ul className="nav flex-column mt-4">
//             <li className="nav-item">
//               <Link to="/" className="nav-link text-white">🏠 Dashboard </Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link to="/salesList " className="nav-link text-white">📑 SalesList</Link>
//             </li> */}
//             <li className="nav-item">
//               <Link to="/homePage" className="nav-link text-white">🏠 Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/sales" className="nav-link text-white">📊 Sales</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/inventory" className="nav-link text-white">📦 Inventory</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//             </li>
//             {/* <li className="nav-item">
//               <Link to="/items" className="nav-link text-white">🛒 Items</Link>
//             </li> */}
//             <li className="nav-item">
//               <Link to="/itemPage" className="nav-link text-white">🛒 ItemPage</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/loginPage" className="nav-link text-white">📑 LoginPage</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/itemSearchPage" className="nav-link text-white">📑 ItemSearchPage</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/reportPage" className="nav-link text-white">📑 ReportPage</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/saleForm " className="nav-link text-white">📑 SaleForm</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/salesList " className="nav-link text-white">📑 SalesList</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           {/* Navbar */}
//           <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//             <div className="container-fluid">
//               {/* <a className="navbar-brand" href="#">Sales Dashboard</a> */}
//             </div>
//           </nav>
//           {/* Page Content */}
//           <div className="container mt-4">
//             <Routes>
//               {/* <Route path="/" element={<Home />} /> */}
//               <Route path="/sales" element={<Sales />} />
//               <Route path="/inventory" element={<Inventory />} />
//               <Route path="/settings" element={<Settings />} />
//               {/* <Route path="/items" element={<Items />} /> */}
//               <Route path="/itemPage" element={<ItemPage />} />
//               {/* <Route path="/report" element={<Report />} /> */}
//               <Route path="/reportPage" element={<ReportPage />} />
//               <Route path="/homePage" element={<HomePage />} />
//               <Route path="/salesList" element={<SalesList />} />
//               <Route path="/saleForm" element={<SaleForm />} />
//               <Route path="/inventory" element={<Inventory />} />

//               <Route path="/loginPage" element={<LoginPage />} />
//               {/* Item details page */}
//               <Route path="/items/:id" element={<ItemDetails />} />
//               <Route path="/itemSearchPage" element={<ItemSearchPage />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

//#####################above works
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import ItemPage from "./pages/ItemPage";
// import SalesList from "./pages/SalesList";
// import ItemDetails from "./pages/ItemDetails";
// import Settings from "./pages/Settings";
// import Sales from "./components/Sales";
// import ReportPage from "./pages/ReportPage";
// import HomePage from "./pages/HomePage";
// import ItemSearchPage from "./pages/ItemSearchPage";
// import SaleForm from "./pages/SaleForm";
// import Inventory from "./pages/Inventory";
// import LoginPage from "./pages/LoginPage";
// import SalesDashboard from "./pages/SalesDashboard";

// function App() {
//   const role = localStorage.getItem("role") || "";

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//           <h4>Dashboard</h4>
//           <ul className="nav flex-column mt-4">
//             <li className="nav-item">
//               <Link to="/" className="nav-link text-white">🏠 Home</Link>
//             </li>

//             {/* Manager links */}
//             {role === "MANAGER" && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/inventory" className="nav-link text-white">📦 Inventory</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/salesList" className="nav-link text-white">📑 Sales List</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/reportPage" className="nav-link text-white">📊 Profit Report</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/saleForm" className="nav-link text-white">➕ Record Sale</Link>
//                 </li>
//               </>
//             )}

//             {/* Seller links */}
//             {role === "SELLER" && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/salesDashboard" className="nav-link text-white">🛒 Sales Dashboard</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/itemPage" className="nav-link text-white">📦 Items</Link>
//                 </li>
//               </>
//             )}

//             {/* Common links */}
//             <li className="nav-item">
//               <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/loginPage" className="nav-link text-white">🔑 Login</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//             <div className="container-fluid"></div>
//           </nav>

//           <div className="container mt-4">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/loginPage" element={<LoginPage />} />

//               {/* Manager Routes */}
//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/itemSearchPage" element={<ItemSearchPage />} />
//                   {/* New added */}
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/sales" element={<Sales />} />

//                 </>
//               )}

//               {/* Seller Routes */}
//               {role === "SELLER" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                 </>
//               )}

//               {/* Redirect unauthorized access */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// ######################################################################### work above

// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import ItemPage from "./pages/ItemPage";
// import SalesList from "./pages/SalesList";
// import ItemDetails from "./pages/ItemDetails";
// import Settings from "./pages/Settings";
// import Sales from "./components/Sales";
// import ReportPage from "./pages/ReportPage";
// //import HomePage from "./pages/HomePage";
// import ItemSearchPage from "./pages/ItemSearchPage";
// import SaleForm from "./pages/SaleForm";
// import Inventory from "./pages/Inventory";
// import LoginPage from "./pages/LoginPage";
// import Register from "./pages/Register";
// import SalesDashboard from "./pages/SalesDashboard";

// function App() {
//   const role = localStorage.getItem("role") || "";

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//           <h4 className="fw-bold">Dashboard</h4>
//           <ul className="nav flex-column mt-4">
//             <li className="nav-item">
//               <Link to="/home" className="nav-link text-white">🏠 Home</Link>
//             </li>

//             {/* Manager links */}
//             {(role === "MANAGER" || role === "ADMIN") && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/inventory" className="nav-link text-white">📦 Inventory</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/salesList" className="nav-link text-white">📑 Sales List</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/reportPage" className="nav-link text-white">📊 Profit Report</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/saleForm" className="nav-link text-white">➕ Record Sale</Link>
//                 </li>
//               </>
//             )}

//             {/* Reception links */}
//             {role === "RECEPTION" && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/salesDashboard" className="nav-link text-white">🛒 Sales Dashboard</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/itemPage" className="nav-link text-white">📦 Items</Link>
//                 </li>
//               </>
//             )}

//             {/* Common links */}
//             <li className="nav-item">
//               <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/loginPage" className="nav-link text-white">🔑 Login</Link>
//             </li>
//             <li className="nav-item">
//               <Link to="/register" className="nav-link text-white">📝 Register</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//             <div className="container-fluid">
//               <span className="navbar-text ms-auto text-muted">
//                 {role ? `Logged in as: ${role}` : "Not logged in"}
//               </span>
//             </div>
//           </nav>

//           <div className="container mt-4">
//             <Routes>
//               {/* <Route path="/homePage" element={<HomePage />} /> */}
//               <Route path="/" element={<LoginPage />} />
//               <Route path="/register" element={<Register />} />

//               {/* Manager/Admin Routes */}
//               {(role === "MANAGER" || role === "ADMIN") && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/itemSearchPage" element={<ItemSearchPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/sales" element={<Sales />} />
//                 </>
//               )}

//               {/* Reception Routes */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                 </>
//               )}

//               {/* Redirect unauthorized access */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// ##################################### this is final
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// /* Pages */
// import LoginPage from "./pages/LoginPage";
// import Register from "./pages/Register";
// import Inventory from "./pages/Inventory";
// import SalesList from "./pages/SalesList";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import ItemPage from "./pages/ItemPage";
// import ItemDetails from "./pages/ItemDetails";
// import ItemSearchPage from "./pages/ItemSearchPage";
// import SalesDashboard from "./pages/SalesDashboard";
// import Settings from "./pages/Settings";
// import Sales from "./components/Sales";

// function App() {
//   const [role, setRole] = useState(localStorage.getItem("role") || "");

//   // Watch for login/logout changes
//   useEffect(() => {
//     const handleStorageChange = () => setRole(localStorage.getItem("role") || "");
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("username");
//     localStorage.removeItem("role");
//     setRole("");
//     window.location.href = "/loginPage";
//   };

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         {role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>Dashboard</h4>
//             <ul className="nav flex-column mt-4">
//               {/* Common links */}
//               <li className="nav-item">
//                 <Link to="/loginPage" className="nav-link text-white">🏠 Home</Link>
//               </li>

//               {/* Manager/Admin links */}
//               {(role === "MANAGER" || role === "ADMIN") && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">📦 Inventory</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">📑 Sales List</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">📊 Profit Report</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">➕ Record Sale</Link>
//                   </li>
//                 </>
//               )}

//               {/* Reception links */}
//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">🛒 Sales Dashboard</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">📦 Items</Link>
//                   </li>
//                 </>
//               )}

//               {/* Common footer links */}
//               <li className="nav-item">
//                 <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//               </li>
//               <li className="nav-item">
//                 <button onClick={handleLogout} className="btn btn-sm btn-danger mt-3 w-100">
//                   🚪 Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//             <div className="container-fluid">
//               {role && (
//                 <span className="navbar-text ms-auto me-3">
//                   Logged in as: <strong>{role}</strong>
//                 </span>
//               )}
//             </div>
//           </nav>

//           <div className="container mt-4">
//             <Routes>
//               {/* Landing Page → Login */}
//               <Route path="/" element={<Navigate to="/loginPage" replace />} />
//               <Route path="/loginPage" element={<LoginPage />} />
//               <Route path="/register" element={<Register />} />

//               {/* Manager/Admin Routes */}
//               {(role === "MANAGER" || role === "ADMIN") && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/itemSearchPage" element={<ItemSearchPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/sales" element={<Sales />} />
//                 </>
//               )}

//               {/* Reception/Seller Routes */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                 </>
//               )}

//               {/* Redirect if unauthorized */}
//               <Route path="*" element={<Navigate to="/loginPage" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import Inventory from "./pages/Inventory";
// import SalesList from "./pages/SalesList";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import ItemPage from "./pages/ItemPage";
// import ItemSearchPage from "./pages/ItemSearchPage";
// import Settings from "./pages/Settings";
// import SalesDashboard from "./pages/SalesDashboard";
// import ItemDetails from "./pages/ItemDetails";
// import Sales from "./components/Sales";
// import LoginPage from "./pages/LoginPage";
// import Register from "./pages/Register";

// function App() {
//   const [role, setRole] = useState(localStorage.getItem("role") || "");

//   useEffect(() => {
//     const storedRole = localStorage.getItem("role");
//     if (storedRole && storedRole !== role) {
//       setRole(storedRole);
//     }
//   }, [role]);

//   const handleLogout = () => {
//     localStorage.removeItem("role");
//     localStorage.removeItem("username");
//     setRole("");
//   };

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         {role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>Dashboard</h4>
//             <ul className="nav flex-column mt-4">
//               {role === "MANAGER" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/homePage" className="nav-link text-white">🏠 Dashboard</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">📦 Inventory</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">📑 Sales List</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">📊 Profit Report</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">➕ Record Sale</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">🛒 ItemPage</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/loginPage" className="nav-link text-white" onClick={handleLogout}>🔑 Logout</Link>
//                   </li>
//                 </>
//               )}

//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">🛒 Sales Dashboard</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">📦 Items</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemSearchPage" className="nav-link text-white">🔍 Search Items</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/loginPage" className="nav-link text-white" onClick={handleLogout}>🔑 Logout</Link>
//                   </li>
//                 </>
//               )}
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           <div className="container mt-4">
//             <Routes>
//               <Route path="/loginPage" element={<LoginPage setRole={setRole} />} />
//               <Route path="/register" element={<Register setRole={setRole} />} />

//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/homePage" element={<ManagerDashboard />} />
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/sales" element={<Sales />} />
//                 </>
//               )}

//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/items/:id" element={<ItemDetails />} />
//                   <Route path="/itemSearchPage" element={<ItemSearchPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Redirect unauthorized */}
//               <Route path="*" element={<Navigate to={role ? (role === "MANAGER" ? "/homePage" : "/salesDashboard") : "/loginPage"} replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
//####################################Final 
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import EasyManageSales from "./pages/EasyManageSales";

// function App() {
//   const role = localStorage.getItem("role") || "";

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//           <h4>Dashboard</h4>
//           <ul className="nav flex-column mt-4">
//             <li className="nav-item">
//               <Link to="/" className="nav-link text-white">🏠 Dashboard</Link>
//             </li>

//             {/* Manager Sidebar */}
//             {role === "MANAGER" && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/inventory" className="nav-link text-white">📦 Inventory</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/salesList" className="nav-link text-white">📑 Sales List</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/reportPage" className="nav-link text-white">📊 Profit Report</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/saleForm" className="nav-link text-white">➕ Record Sale</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/itemPage" className="nav-link text-white">🛒 ItemPage</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//                 </li>
//               </>
//             )}

//             {/* Reception Sidebar */}
//             {role === "RECEPTION" && (
//               <>
//                 <li className="nav-item">
//                   <Link to="/salesDashboard" className="nav-link text-white">🛒 Sales Dashboard</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/itemPage" className="nav-link text-white">📦 ItemPage</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/itemSearchPage" className="nav-link text-white">🔍 Item Search</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to="/easyManageSales" className="nav-link text-white">💰 Easy Manage Sales</Link>
//                 </li>
//               </>
//             )}

//             {/* Common links */}
//             <li className="nav-item">
//               <Link to="/loginPage" className="nav-link text-white">🔑 Login</Link>
//             </li>
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           <div className="container mt-4">
//             <Routes>
//               {/* Root route: redirect based on role */}
//               <Route
//                 path="/"
//                 element={
//                   role === "MANAGER" ? <ManagerDashboard /> :
//                   role === "RECEPTION" ? <SalesDashboard /> :
//                   <Navigate to="/loginPage" replace />
//                 }
//               />

//               {/* Common Routes */}
//               <Route path="/loginPage" element={<LoginPage />} />

//               {/* Manager Routes */}
//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Reception Routes */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/itemSearchPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/easyManageSales" element={<EasyManageSales />} />
//                 </>
//               )}

//               {/* Redirect unauthorized access */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import ItemPage from "./pages/ItemPage";
// // import ItemDetails from "./pages/ItemDetails";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Main items page */}
// //         <Route path="/" element={<ItemPage />} />

// //         {/* Item details page */}
// //         <Route path="/items/:id" element={<ItemDetails />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;


// import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import EasyManageSales from "./pages/EasyManageSales";

// function App() {
//   const [role, setRole] = useState(localStorage.getItem("role") || "");

//   // Watch for role changes (after login/logout)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setRole(localStorage.getItem("role") || "");
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         {role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>Dashboard</h4>
//             <ul className="nav flex-column mt-4">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link text-white">🏠 Dashboard</Link>
//               </li>

//               {/* Manager Sidebar */}
//               {role === "MANAGER" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">📦 Inventory</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">📑 Sales List</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">📊 Profit Report</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">➕ Record Sale</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">🛒 ItemPage</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//                   </li>
//                 </>
//               )}

//               {/* Reception Sidebar */}
//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">🛒 Sales Dashboard</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">📦 ItemPage</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemSearchPage" className="nav-link text-white">🔍 Item Search</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/easyManageSales" className="nav-link text-white">💰 Easy Manage Sales</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">⚙️ Settings</Link>
//                   </li>
//                 </>
//               )}

//               {/* Common link */}
//               <li className="nav-item">
//                 <Link
//                   to="/loginPage"
//                   className="nav-link text-white"
//                   onClick={() => {
//                     localStorage.clear();
//                     setRole("");
//                   }}
//                 >
//                   🔑 Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           <div className="container mt-4">
//             <Routes>
//               {/* Root route: redirect based on role */}
//               <Route
//                 path="/"
//                 element={
//                   role === "MANAGER" ? (
//                     <ManagerDashboard />
//                   ) : role === "RECEPTION" ? (
//                     <SalesDashboard />
//                   ) : (
//                     <Navigate to="/loginPage" replace />
//                   )
//                 }
//               />

//               {/* Login Page */}
//               <Route
//                 path="/loginPage"
//                 element={<LoginPage />}
//               />

//               {/* Manager Routes */}
//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Reception Routes */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/itemSearchPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                   <Route path="/easyManageSales" element={<EasyManageSales />} />
//                 </>
//               )}

//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
// } from "react-router-dom";
// import { useEffect, useState } from "react";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import EasyManageSales from "./pages/EasyManageSales";

// function App() {
//   const [role, setRole] = useState(localStorage.getItem("role") || "");

//   // 🔥 Sync role instantly on login + tab changes
//   useEffect(() => {
//     const syncRole = () => {
//       setRole(localStorage.getItem("role") || "");
//     };

//     // Role updated from LoginPage.js
//     window.addEventListener("roleChanged", syncRole);

//     // Role changed manually or from another tab
//     window.addEventListener("storage", syncRole);

//     return () => {
//       window.removeEventListener("roleChanged", syncRole);
//       window.removeEventListener("storage", syncRole);
//     };
//   }, []);

//   return (
//     <Router>
//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         {role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>Dashboard</h4>
//             <ul className="nav flex-column mt-4">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link text-white">
//                   🏠 Dashboard
//                 </Link>
//               </li>

//               {/* Manager Sidebar */}
//               {role === "MANAGER" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">
//                       📦 Inventory
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">
//                       📑 Sales List
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">
//                       📊 Profit Report
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">
//                       ➕ Record Sale
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       🛒 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Reception Sidebar */}
//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">
//                       🛒 Sales Dashboard
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       📦 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to="/itemSearchPage"
//                       className="nav-link text-white"
//                     >
//                       🔍 Item Search
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link
//                       to="/easyManageSales"
//                       className="nav-link text-white"
//                     >
//                       💰 Easy Manage Sales
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Logout */}
//               <li className="nav-item">
//                 <Link
//                   to="/loginPage"
//                   className="nav-link text-white"
//                   onClick={() => {
//                     localStorage.clear();
//                     setRole("");
//                     window.dispatchEvent(new Event("roleChanged"));
//                   }}
//                 >
//                   🔑 Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1">
//           <div className="container mt-4">
//             <Routes>
//               {/* Root redirect */}
//               <Route
//                 path="/"
//                 element={
//                   role === "MANAGER" ? (
//                     <ManagerDashboard />
//                   ) : role === "RECEPTION" ? (
//                     <SalesDashboard />
//                   ) : (
//                     <Navigate to="/loginPage" replace />
//                   )
//                 }
//               />

//               {/* Login */}
//               <Route path="/loginPage" element={<LoginPage />} />

//               {/* Manager Routes */}
//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Reception Routes */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route
//                     path="/salesDashboard"
//                     element={<SalesDashboard />}
//                   />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/itemSearchPage" element={<ItemPage />} />
//                   <Route
//                     path="/easyManageSales"
//                     element={<EasyManageSales />}
//                   />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

//############################## intergrated with NSAA

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
// } from "react-router-dom";
// import { useEffect, useState } from "react";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import EasyManageSales from "./pages/EasyManageSales";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// function App() {
//   const [role, setRole] = useState(localStorage.getItem("role") || "");
//   const [tenant, setTenant] = useState({ companyName: "NSAA Systems" }); // default parent company

//   // Sync role instantly on login + tab changes
//   useEffect(() => {
//     const syncRole = () => setRole(localStorage.getItem("role") || "");
//     window.addEventListener("roleChanged", syncRole);
//     window.addEventListener("storage", syncRole);
//     return () => {
//       window.removeEventListener("roleChanged", syncRole);
//       window.removeEventListener("storage", syncRole);
//     };
//   }, []);

//   return (
//     <Router>
//       {/* Header with tenant branding */}
//       <Header tenant={tenant} title={role ? `${role} Dashboard` : ""} />

//       <div className="d-flex vh-100">
//         {/* Sidebar */}
//         {role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>{tenant.companyName}</h4>
//             <ul className="nav flex-column mt-4">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link text-white">
//                   🏠 Dashboard
//                 </Link>
//               </li>

//               {/* Manager Sidebar */}
//               {role === "MANAGER" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">
//                       📦 Inventory
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">
//                       📑 Sales List
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">
//                       📊 Profit Report
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">
//                       ➕ Record Sale
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       🛒 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Reception Sidebar */}
//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">
//                       🛒 Sales Dashboard
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       📦 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemSearchPage" className="nav-link text-white">
//                       🔍 Item Search
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/easyManageSales" className="nav-link text-white">
//                       💰 Easy Manage Sales
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Logout */}
//               <li className="nav-item">
//                 <Link
//                   to="/loginPage"
//                   className="nav-link text-white"
//                   onClick={() => {
//                     localStorage.clear();
//                     setRole("");
//                     window.dispatchEvent(new Event("roleChanged"));
//                   }}
//                 >
//                   🔑 Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1 overflow-auto">
//           <div className="container mt-4 mb-5">
//             <Routes>
//               {/* Root redirect */}
//               <Route
//                 path="/"
//                 element={
//                   role === "MANAGER" ? (
//                     <ManagerDashboard />
//                   ) : role === "RECEPTION" ? (
//                     <SalesDashboard />
//                   ) : (
//                     <Navigate to="/loginPage" replace />
//                   )
//                 }
//               />

//               {/* Login */}
//               <Route path="/loginPage" element={<LoginPage />} />

//               {/* Manager Routes */}
//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Reception Routes */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   {/* <Route path="/itemPage" element={<ItemPage />} /> */}
//                   <Route path="/itemSearchPage" element={<SaleForm />} />
//                   <Route path="/easyManageSales" element={<EasyManageSales />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </Router>
//   );
// }

//export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
// } from "react-router-dom";
// import { useEffect, useState } from "react";

// import MainLayout from "./layouts/MainLayout";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import Register from "./pages/Register";
// import EasyManageSales from "./pages/EasyManageSales";

// function App() {
//   const [role, setRole] = useState(localStorage.getItem("role") || "");

//   // 🔥 Sync role instantly on login + tab changes
//   useEffect(() => {
//     const syncRole = () => {
//       setRole(localStorage.getItem("role") || "");
//     };

//     window.addEventListener("roleChanged", syncRole);
//     window.addEventListener("storage", syncRole);

//     return () => {
//       window.removeEventListener("roleChanged", syncRole);
//       window.removeEventListener("storage", syncRole);
//     };
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         {/* Root redirect based on role */}
//         <Route
//           path="/"
//           element={
//             role === "MANAGER" ? (
//               <MainLayout>
//                 <ManagerDashboard />
//               </MainLayout>
//             ) : role === "RECEPTION" ? (
//               <MainLayout>
//                 <SalesDashboard />
//               </MainLayout>
//             ) : (
//               <Navigate to="/loginPage" replace />
//             )
//           }
//         />

//         {/* Login & Register - no header/footer */}
//         <Route path="/loginPage" element={<LoginPage />} />
//         <Route path="/register" element={<Register />} />

//         {/* Manager Routes */}
//         {role === "MANAGER" && (
//           <>
//             <Route
//               path="/inventory"
//               element={
//                 <MainLayout>
//                   <Inventory />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/salesList"
//               element={
//                 <MainLayout>
//                   <SalesList />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/reportPage"
//               element={
//                 <MainLayout>
//                   <ReportPage />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/saleForm"
//               element={
//                 <MainLayout>
//                   <SaleForm />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/itemPage"
//               element={
//                 <MainLayout>
//                   <ItemPage />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/settings"
//               element={
//                 <MainLayout>
//                   <Settings />
//                 </MainLayout>
//               }
//             />
//           </>
//         )}

//         {/* Reception Routes */}
//         {role === "RECEPTION" && (
//           <>
//             <Route
//               path="/salesDashboard"
//               element={
//                 <MainLayout>
//                   <SalesDashboard />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/itemPage"
//               element={
//                 <MainLayout>
//                   <ItemPage />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/itemSearchPage"
//               element={
//                 <MainLayout>
//                   <ItemPage />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/easyManageSales"
//               element={
//                 <MainLayout>
//                   <EasyManageSales />
//                 </MainLayout>
//               }
//             />
//             <Route
//               path="/settings"
//               element={
//                 <MainLayout>
//                   <Settings />
//                 </MainLayout>
//               }
//             />
//           </>
//         )}

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { useEffect, useState } from "react";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import EasyManageSales from "./pages/EasyManageSales";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// function App() {
//   const location = useLocation();
//   const [role, setRole] = useState(localStorage.getItem("role") || "");
//   const [tenant, setTenant] = useState({ companyName: "NSAA Systems" }); // Parent company

//   // Sync role changes across tabs + login/logout
//   useEffect(() => {
//     const syncRole = () => setRole(localStorage.getItem("role") || "");
//     window.addEventListener("roleChanged", syncRole);
//     window.addEventListener("storage", syncRole);
//     return () => {
//       window.removeEventListener("roleChanged", syncRole);
//       window.removeEventListener("storage", syncRole);
//     };
//   }, []);

//   // Hide header/footer/sidebar on these routes
//   const authPages = ["/loginPage", "/register"];
//   const isAuthPage = authPages.includes(location.pathname);

//   return (
//     <>
//       {/* Header — hidden on auth pages */}
//       {!isAuthPage && <Header tenant={tenant} title={role ? `${role} Dashboard` : ""} />}

//       <div className="d-flex vh-100">
//         {/* Sidebar — visible only when logged in and not on auth pages */}
//         {!isAuthPage && role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>{tenant.companyName}</h4>
//             <ul className="nav flex-column mt-4">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link text-white">
//                   🏠 Dashboard
//                 </Link>
//               </li>

//               {role === "MANAGER" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">
//                       📦 Inventory
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">
//                       📑 Sales List
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">
//                       📊 Profit Report
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">
//                       ➕ Record Sale
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       🛒 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">
//                       🛒 Sales Dashboard
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       📦 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemSearchPage" className="nav-link text-white">
//                       🔍 Item Search
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/easyManageSales" className="nav-link text-white">
//                       💰 Easy Manage Sales
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Logout */}
//               <li className="nav-item">
//                 <Link
//                   to="/loginPage"
//                   className="nav-link text-white"
//                   onClick={() => {
//                     localStorage.clear();
//                     setRole("");
//                     window.dispatchEvent(new Event("roleChanged"));
//                   }}
//                 >
//                   🔑 Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1 overflow-auto">
//           <div className={isAuthPage ? "" : "container mt-4 mb-5"}>
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   role === "MANAGER" ? (
//                     <ManagerDashboard />
//                   ) : role === "RECEPTION" ? (
//                     <SalesDashboard />
//                   ) : (
//                     <Navigate to="/loginPage" replace />
//                   )
//                 }
//               />
//               <Route path="/loginPage" element={<LoginPage />} />

//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/easyManageSales" element={<EasyManageSales />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>

//       {/* Footer — hidden on auth pages */}
//       {!isAuthPage && <Footer />}
//     </>
//   );
// }

// export default function RootApp() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { useEffect, useState } from "react";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import EasyManageSales from "./pages/EasyManageSales";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// function App() {
//   const location = useLocation();
//   const [role, setRole] = useState(localStorage.getItem("role") || "");
//   const [tenant, setTenant] = useState({ companyName: "NSAA Systems" }); // Parent company

//   // Sync role changes across tabs + login/logout
//   useEffect(() => {
//     const syncRole = () => setRole(localStorage.getItem("role") || "");
//     window.addEventListener("roleChanged", syncRole);
//     window.addEventListener("storage", syncRole);
//     return () => {
//       window.removeEventListener("roleChanged", syncRole);
//       window.removeEventListener("storage", syncRole);
//     };
//   }, []);

//   // Hide header/footer/sidebar on these routes
//   const authPages = ["/loginPage", "/register"];
//   const isAuthPage = authPages.includes(location.pathname);

//   return (
//     <>
//       {/* Header — hidden on auth pages */}
//       {!isAuthPage && (
//         <Header tenant={tenant} title={role ? `${role} Dashboard` : ""} />
//       )}

//       <div className="d-flex vh-100">
//         {/* Sidebar — visible only when logged in and not on auth pages */}
//         {!isAuthPage && role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>{tenant.companyName}</h4>

//             <ul className="nav flex-column mt-4">
//               {/* Dashboard */}
//               <li className="nav-item">
//                 <Link to="/" className="nav-link text-white">
//                   🏠 Dashboard
//                 </Link>
//               </li>

//               {/* ================= MANAGER SIDEBAR ================= */}
//               {role === "MANAGER" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">
//                       📦 Inventory
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">
//                       📑 Sales List
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">
//                       📊 Profit Report
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">
//                       ➕ Record Sale
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       🛒 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* ================= RECEPTION SIDEBAR ================= */}
//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">
//                       🛒 Sales Dashboard
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       📦 Item Page
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/itemSearchPage" className="nav-link text-white">
//                       🔍 Item Search
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">
//                       ➕ Record Sale
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/easyManageSales" className="nav-link text-white">
//                       💰 Easy Manage Sales
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Logout */}
//               <li className="nav-item">
//                 <Link
//                   to="/loginPage"
//                   className="nav-link text-white"
//                   onClick={() => {
//                     localStorage.clear();
//                     setRole("");
//                     window.dispatchEvent(new Event("roleChanged"));
//                   }}
//                 >
//                   🔑 Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1 overflow-auto">
//           <div className={isAuthPage ? "" : "container mt-4 mb-5"}>
//             <Routes>
//               {/* Root redirect */}
//               <Route
//                 path="/"
//                 element={
//                   role === "MANAGER" ? (
//                     <ManagerDashboard />
//                   ) : role === "RECEPTION" ? (
//                     <SalesDashboard />
//                   ) : (
//                     <Navigate to="/loginPage" replace />
//                   )
//                 }
//               />

//               {/* Login */}
//               <Route path="/loginPage" element={<LoginPage />} />

//               {/* ============ MANAGER ROUTES ============ */}
//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* ============ RECEPTION ROUTES ============ */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/easyManageSales" element={<EasyManageSales />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/itemSearchPage" element={<SaleForm />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>

//       {/* Footer — hidden on auth pages */}
//       {!isAuthPage && <Footer tenant={tenant} />}
//     </>
//   );
// }

// export default function RootApp() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Link,
//   Navigate,
//   useLocation,
// } from "react-router-dom";
// import { useEffect, useState } from "react";

// import ManagerDashboard from "./pages/ManagerDashboard";
// import SalesDashboard from "./pages/SalesDashboard";
// import Inventory from "./pages/Inventory";
// import ItemPage from "./pages/ItemPage";
// import ReportPage from "./pages/ReportPage";
// import SaleForm from "./pages/SaleForm";
// import SalesList from "./pages/SalesList";
// import Settings from "./pages/Settings";
// import LoginPage from "./pages/LoginPage";
// import EasyManageSales from "./pages/EasyManageSales";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// function App() {
//   const location = useLocation();
//   const [role, setRole] = useState(localStorage.getItem("role") || "");
//   // keep tenant state (no setTenant to silence unused-var warning)
//   const [tenant] = useState({ companyName: "NSAA Systems" });

//   // Sync role changes across tabs + login/logout
//   useEffect(() => {
//     const syncRole = () => setRole(localStorage.getItem("role") || "");
//     window.addEventListener("roleChanged", syncRole);
//     window.addEventListener("storage", syncRole);
//     return () => {
//       window.removeEventListener("roleChanged", syncRole);
//       window.removeEventListener("storage", syncRole);
//     };
//   }, []);

//   // Hide header/footer/sidebar on these auth routes
//   const authPages = ["/loginPage", "/register"];
//   const isAuthPage = authPages.includes(location.pathname);

//   // Sidebar title e.g. "NSAA Systems Dashboard" or "{tenant} Dashboard"
//   const sidebarTitle = `${tenant?.companyName || "NSAA Systems"} Dashboard`;

//   return (
//     <>
//       {/* Header — hidden on auth pages */}
//       {!isAuthPage && <Header tenant={tenant} title={role ? `${role} Dashboard` : ""} />}

//       <div className="d-flex vh-100">
//         {/* Sidebar — visible only when logged in and not on auth pages */}
//         {!isAuthPage && role && (
//           <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//             <h4>{sidebarTitle}</h4>
//             <ul className="nav flex-column mt-4">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link text-white">
//                   🏠 Dashboard
//                 </Link>
//               </li>

//               {/* Manager Sidebar */}
//               {role === "MANAGER" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/inventory" className="nav-link text-white">
//                       📦 Inventory
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/salesList" className="nav-link text-white">
//                       📑 Sales List
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/reportPage" className="nav-link text-white">
//                       📊 Profit Report
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">
//                       ➕ Record Sale
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/itemPage" className="nav-link text-white">
//                       🛒 Item Page
//                     </Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Reception Sidebar — Item and Item Search removed */}
//               {role === "RECEPTION" && (
//                 <>
//                   <li className="nav-item">
//                     <Link to="/salesDashboard" className="nav-link text-white">
//                       🛒 Sales Dashboard
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/saleForm" className="nav-link text-white">
//                       ➕ Record Sale
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/easyManageSales" className="nav-link text-white">
//                       💰 Easy Manage Sales
//                     </Link>
//                   </li>

//                   <li className="nav-item">
//                     <Link to="/settings" className="nav-link text-white">
//                       ⚙️ Settings
//                     </Link>
//                   </li>
//                 </>
//               )}

//               {/* Logout */}
//               <li className="nav-item">
//                 <Link
//                   to="/loginPage"
//                   className="nav-link text-white"
//                   onClick={() => {
//                     localStorage.clear();
//                     setRole("");
//                     window.dispatchEvent(new Event("roleChanged"));
//                   }}
//                 >
//                   🔑 Logout
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="flex-grow-1 overflow-auto">
//           <div className={isAuthPage ? "" : "container mt-4 mb-5"}>
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   role === "MANAGER" ? (
//                     <ManagerDashboard />
//                   ) : role === "RECEPTION" ? (
//                     <SalesDashboard />
//                   ) : (
//                     <Navigate to="/loginPage" replace />
//                   )
//                 }
//               />

//               {/* Auth */}
//               <Route path="/loginPage" element={<LoginPage />} />
//               <Route path="/register" element={<LoginPage />} />

//               {/* Manager Routes */}
//               {role === "MANAGER" && (
//                 <>
//                   <Route path="/inventory" element={<Inventory />} />
//                   <Route path="/salesList" element={<SalesList />} />
//                   <Route path="/reportPage" element={<ReportPage />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/itemPage" element={<ItemPage />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Reception Routes (no Item / ItemSearch) */}
//               {role === "RECEPTION" && (
//                 <>
//                   <Route path="/salesDashboard" element={<SalesDashboard />} />
//                   <Route path="/saleForm" element={<SaleForm />} />
//                   <Route path="/easyManageSales" element={<EasyManageSales />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </>
//               )}

//               {/* Fallback */}
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </Routes>
//           </div>
//         </div>
//       </div>

//       {/* Footer — hidden on auth pages */}
//       {!isAuthPage && <Footer tenant={tenant} />}
//     </>
//   );
// }

// export default function RootApp() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }

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
