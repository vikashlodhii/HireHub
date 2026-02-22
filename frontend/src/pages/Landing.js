import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>

      {/* HERO SECTION */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">
            Find Your <span className="text-primary">Dream Job</span> 🚀
          </h1>
          <p className="lead mt-3">
            Connect with top recruiters and get hired faster.
          </p>

          <div className="mt-4">
            <Link to="/signup" className="btn btn-primary btn-lg me-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline-dark btn-lg">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Why Choose HireHub?</h2>

        <div className="row text-center">
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <h4>🔎 Smart Job Matching</h4>
              <p>Find jobs based on your skills and interests.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <h4>⚡ Easy Apply</h4>
              <p>Apply to jobs instantly with one click.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <h4>📊 Recruiter Dashboard</h4>
              <p>Manage applications professionally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-primary text-white text-center py-5">
        <h3>Ready to Get Hired?</h3>
        <Link to="/signup" className="btn btn-light btn-lg mt-3">
          Create Free Account
        </Link>
      </div>

    </div>
  );
}

export default Landing;
