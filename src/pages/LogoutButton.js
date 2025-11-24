

import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth info
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("auth");

    // Redirect to login page
    navigate("/loginPage");
  };

  return (
    <button
      className="btn btn-outline-danger w-100 mt-3"
      onClick={handleLogout}
    >
      🚪 Logout
    </button>
  );
}
