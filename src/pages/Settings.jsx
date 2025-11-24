

import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    picture: "",
    username: "John Doe",
    email: "john@example.com",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  });

  // Apply dark mode instantly
  useEffect(() => {
    if (preferences.darkMode) {
      document.body.classList.add("bg-dark", "text-light");
    } else {
      document.body.classList.remove("bg-dark", "text-light");
    }
  }, [preferences.darkMode]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert("Profile saved!");
  };

  const handlePreferencesSave = (e) => {
    e.preventDefault();
    alert("Preferences saved!");
  };

  const cardClass = preferences.darkMode ? "bg-secondary text-light" : "";

  return (
    <>
      {/* 🔵 SAME NAVBAR AS SALES DASHBOARD */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Settings</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/salesDashboard")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/saleForm")}>Record Sale</Nav.Link>
              <Nav.Link onClick={() => navigate("/easyManageSales")}>
                Easy Manage Sales
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/settings")}>Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🔧 Settings Content */}
      <div className="container my-4">
        {/* Tabs */}
        <ul className="nav nav-tabs mb-3" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile"
              type="button"
              role="tab"
            >
              <i className="bi bi-person-circle me-1"></i> Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="preferences-tab"
              data-bs-toggle="tab"
              data-bs-target="#preferences"
              type="button"
              role="tab"
            >
              <i className="bi bi-sliders me-1"></i> Preferences
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {/* Profile Tab */}
          <div className="tab-pane fade show active" id="profile" role="tabpanel">
            <div className={`card shadow-sm mb-4 ${cardClass}`}>
              <div className="card-body">
                <form onSubmit={handleProfileSave}>
                  <div className="row align-items-center mb-3">
                    <div className="col-md-4 text-center mb-3 mb-md-0">
                      <label className="form-label d-block mb-2">Profile Picture</label>
                      <img
                        src={profile.picture || "https://via.placeholder.com/120"}
                        alt="Profile"
                        className="rounded-circle mb-2"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control mt-2"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () =>
                              setProfile({ ...profile, picture: reader.result });
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>

                    <div className="col-md-8">
                      <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          value={profile.username}
                          onChange={(e) =>
                            setProfile({ ...profile, username: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          value={profile.email}
                          onChange={(e) =>
                            setProfile({ ...profile, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Save Profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Preferences Tab */}
          <div className="tab-pane fade" id="preferences" role="tabpanel">
            <div className={`card shadow-sm mb-4 ${cardClass}`}>
              <div className="card-body">
                <form onSubmit={handlePreferencesSave}>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="notifications"
                      checked={preferences.notifications}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          notifications: e.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="notifications">
                      Enable Notifications
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="darkMode"
                      checked={preferences.darkMode}
                      onChange={(e) =>
                        setPreferences({ ...preferences, darkMode: e.target.checked })
                      }
                    />
                    <label className="form-check-label" htmlFor="darkMode">
                      Enable Dark Mode (Live)
                    </label>
                  </div>

                  <button type="submit" className="btn btn-success">
                    Save Preferences
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
