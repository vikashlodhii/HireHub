import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let role = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link
          className="navbar-brand fw-bold text-info"
          to={token ? "/home" : "/"}
        >
          HireHub 🚀
        </Link>

        <div>
          {!token ? (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-info" to="/signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* JobSeeker */}
              {role === "jobseeker" && (
                <Link
                  className="btn btn-outline-light me-2"
                  to="/my-applications"
                >
                  My Applications
                </Link>
              )}

              {/* Recruiter */}
              {role === "recruiter" && (
                <>
                  <Link
                    className="btn btn-success me-2"
                    to="/create-job"
                  >
                    Post Job
                  </Link>

                  <Link
                    className="btn btn-outline-light me-2"
                    to="/recruiter"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {/* Profile */}
              <Link
                className="btn btn-outline-info me-2"
                to="/profile"
              >
                Profile
              </Link>

              {/* Logout */}
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;