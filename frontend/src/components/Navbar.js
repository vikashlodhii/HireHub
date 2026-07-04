import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm sticky-top ${
        darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"
      }`}
    >
      {" "}
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
          💼 HireHub
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="btn btn-light ms-lg-3" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                {role === "jobseeker" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/home">
                        Jobs
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/my-applications">
                        My Applications
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/saved-jobs">
                        ❤️ Saved Jobs
                      </Link>
                    </li>
                  </>
                )}

                {role === "recruiter" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/recruiter">
                        Dashboard
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/create-job">
                        Post Job
                      </Link>
                    </li>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin">
                        Admin Dashboard
                      </Link>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item me-3">
                  <button
                    className="btn btn-outline-light"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? "☀ Light" : "🌙 Dark"}
                  </button>
                </li>
                <li className="nav-item">
                  <button onClick={logout} className="btn btn-danger ms-lg-3">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
