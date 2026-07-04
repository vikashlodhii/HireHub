import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Landing() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="badge bg-warning text-dark mb-3 px-3 py-2">
                🚀 India's Smart Job Portal
              </span>

              <h1>
                Find Your <span className="text-warning">Dream Job</span>
                <br />
                Build Your Career
              </h1>

              <p className="mt-4">
                HireHub connects talented candidates with top recruiters. Search
                jobs, apply instantly and manage your career from one place.
              </p>

              <div className="mt-4">
                <Link to="/signup" className="btn btn-light btn-lg me-3 px-4">
                  Get Started
                </Link>

                <Link to="/login" className="btn btn-outline-light btn-lg px-4">
                  Login
                </Link>
              </div>
            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <i
                className="bi bi-briefcase-fill"
                style={{
                  fontSize: "220px",
                  color: "white",
                }}
              ></i>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <div className="container">
        <div className="row stats text-center p-4">
          <div className="col-md-3">
            <h2 className="counter">10K+</h2>
            <p>Jobs Posted</p>
          </div>

          <div className="col-md-3">
            <h2 className="counter">5K+</h2>
            <p>Companies</p>
          </div>

          <div className="col-md-3">
            <h2 className="counter">25K+</h2>
            <p>Job Seekers</p>
          </div>

          <div className="col-md-3">
            <h2 className="counter">98%</h2>
            <p>Hiring Success</p>
          </div>
        </div>
      </div>
      {/* WHY CHOOSE HIREHUB */}

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Why Choose <span className="text-primary">HireHub?</span>
            </h2>

            <p className="text-muted">
              Everything you need to find your dream job or hire the best
              talent.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card feature-card shadow h-100 p-4 text-center">
                <div className="icon-box mb-3">
                  <i className="bi bi-search"></i>
                </div>

                <h5>Smart Search</h5>

                <p className="text-muted">
                  Search jobs using skills, company, location and keywords.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card feature-card shadow h-100 p-4 text-center">
                <div className="icon-box mb-3">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>

                <h5>Quick Apply</h5>

                <p className="text-muted">
                  Apply to jobs instantly with just one click.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card feature-card shadow h-100 p-4 text-center">
                <div className="icon-box mb-3">
                  <i className="bi bi-person-workspace"></i>
                </div>

                <h5>Recruiter Dashboard</h5>

                <p className="text-muted">
                  Manage jobs, applicants and interviews professionally.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card feature-card shadow h-100 p-4 text-center">
                <div className="icon-box mb-3">
                  <i className="bi bi-shield-check"></i>
                </div>

                <h5>Secure Platform</h5>

                <p className="text-muted">
                  JWT authentication keeps your account safe and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP COMPANIES */}

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Trusted By Top Companies</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="card company-card shadow text-center p-4">
                <i className="bi bi-google fs-1 text-danger"></i>
                <h5 className="mt-3">Google</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card company-card shadow text-center p-4">
                <i className="bi bi-microsoft fs-1 text-primary"></i>
                <h5 className="mt-3">Microsoft</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card company-card shadow text-center p-4">
                <i className="bi bi-amazon fs-1 text-warning"></i>
                <h5 className="mt-3">Amazon</h5>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card company-card shadow text-center p-4">
                <i className="bi bi-meta fs-1 text-primary"></i>
                <h5 className="mt-3">Meta</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* TESTIMONIALS */}

      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What Our Users Say</h2>

            <p className="text-muted">
              Thousands of professionals trust HireHub to build their careers.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow border-0 p-4 h-100">
                <div className="text-warning mb-3">⭐⭐⭐⭐⭐</div>

                <p>
                  "HireHub helped me find my first software developer job in
                  less than two weeks."
                </p>

                <hr />

                <h6 className="mb-0">Rahul Sharma</h6>
                <small className="text-muted">Frontend Developer</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow border-0 p-4 h-100">
                <div className="text-warning mb-3">⭐⭐⭐⭐⭐</div>

                <p>
                  "The recruiter dashboard is simple, fast and saves us a lot of
                  hiring time."
                </p>

                <hr />

                <h6 className="mb-0">Priya Singh</h6>
                <small className="text-muted">HR Manager</small>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow border-0 p-4 h-100">
                <div className="text-warning mb-3">⭐⭐⭐⭐⭐</div>

                <p>
                  "The best job portal project I have used. Clean interface and
                  easy application process."
                </p>

                <hr />

                <h6 className="mb-0">Amit Verma</h6>
                <small className="text-muted">Backend Engineer</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}

      <section className="container my-5">
        <div className="cta text-center p-5">
          <h2 className="fw-bold">Ready to Start Your Career?</h2>

          <p className="mt-3">
            Join thousands of job seekers and recruiters on HireHub.
          </p>

          <Link to="/signup" className="btn btn-light btn-lg mt-3 px-5">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="footer mt-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4">
              <h3 className="fw-bold">HireHub</h3>

              <p className="mt-3">
                A modern MERN Job Portal connecting talented candidates with top
                companies.
              </p>
            </div>

            <div className="col-md-4">
              <h5>Quick Links</h5>

              <ul className="list-unstyled">
                <li className="mt-2">
                  <Link className="text-white text-decoration-none" to="/">
                    Home
                  </Link>
                </li>

                <li className="mt-2">
                  <Link className="text-white text-decoration-none" to="/login">
                    Login
                  </Link>
                </li>

                <li className="mt-2">
                  <Link
                    className="text-white text-decoration-none"
                    to="/signup"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5>Follow Us</h5>

              <div className="fs-3 mt-3">
                <i className="bi bi-facebook me-3"></i>

                <i className="bi bi-linkedin me-3"></i>

                <i className="bi bi-github me-3"></i>

                <i className="bi bi-twitter-x"></i>
              </div>
            </div>
          </div>

          <hr className="bg-light" />

          <div className="text-center">
            © 2026 HireHub | Developed with ❤️ using MERN Stack
          </div>
        </div>
      </footer>
    </>
  );
}

export default Landing;
