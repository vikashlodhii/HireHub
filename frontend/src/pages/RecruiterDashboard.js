import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function RecruiterDashboard() {
  const [stats, setStats] = useState({});
  const [myJobs, setMyJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const token = localStorage.getItem("token");

  

  const loadDashboard = useCallback(async () => {
  try {
    const statsRes = await axios.get(
      `${process.env.REACT_APP_API}/jobs/recruiter/stats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const jobsRes = await axios.get(
      `${process.env.REACT_APP_API}/jobs/my-jobs`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStats(statsRes.data);
    setMyJobs(jobsRes.data);
  } catch (err) {
    console.log(err);
  }
}, [token]);

useEffect(() => {
  loadDashboard();
}, [loadDashboard]);

  const fetchApplicants = async (jobId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setApplications(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch applicants");
    }
  };

  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API}/jobs/delete/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadDashboard();
    } catch (err) {
      alert("Delete Failed");
    }
  };
  const updateStatus = async (applicationId, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/applications/status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Status Updated Successfully");

      // Applicants list refresh
      const jobId = applications[0]?.job?._id;
      if (jobId) {
        fetchApplicants(jobId);
      }
    } catch (err) {
      console.log(err);
      alert("Status Update Failed");
    }
  };
  const chartData = {
    labels: ["Jobs", "Applications", "Applicants"],

    datasets: [
      {
        data: [
          stats.totalJobs || 0,
          stats.totalApplications || 0,
          stats.totalApplicants || 0,
        ],

        backgroundColor: ["#0d6efd", "#198754", "#dc3545"],
      },
    ],
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold text-primary">Recruiter Dashboard</h2>

          <p className="text-muted">Manage Jobs & Applications</p>
        </div>

        <Link to="/create-job" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Post Job
        </Link>
      </div>

      <div className="row mb-5">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow text-center p-4">
            <i
              className="bi bi-briefcase-fill text-primary"
              style={{ fontSize: "45px" }}
            ></i>

            <h2 className="mt-3">{stats.totalJobs || 0}</h2>

            <p>Total Jobs</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow text-center p-4">
            <i
              className="bi bi-file-earmark-person-fill text-success"
              style={{ fontSize: "45px" }}
            ></i>

            <h2 className="mt-3">{stats.totalApplications || 0}</h2>

            <p>Applications</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow text-center p-4">
            <i
              className="bi bi-people-fill text-danger"
              style={{ fontSize: "45px" }}
            ></i>

            <h2 className="mt-3">{stats.totalApplicants || 0}</h2>

            <p>Applicants</p>
          </div>
        </div>
      </div>
      <div className="card shadow border-0 mb-5">
        <div className="card-body">
          <h4 className="text-center mb-4">📊 Dashboard Analytics</h4>

          <div
            style={{
              width: "350px",
              height: "350px",
              margin: "0 auto",
            }}
          >
            <Doughnut data={chartData} />
          </div>
        </div>
      </div>
      <h4 className="fw-bold mb-4">My Posted Jobs</h4>

      <div className="row">
        {myJobs.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              No Jobs Posted Yet.
            </div>
          </div>
        ) : (
          myJobs.map((job) => (
            <div key={job._id} className="col-lg-6 mb-4">
              <div
                className="card border-0 shadow-lg h-100"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="text-primary fw-bold">{job.title}</h4>

                      <h6 className="text-secondary">🏢 {job.company}</h6>
                    </div>

                    <span className="badge bg-success align-self-start">
                      {job.jobType || "Full Time"}
                    </span>
                  </div>

                  <p className="text-muted mt-3">{job.description}</p>

                  <div className="mb-3">
                    <span className="badge bg-light text-dark me-2">
                      📍 {job.location}
                    </span>

                    <span className="badge bg-warning text-dark me-2">
                      💰 ₹ {job.salary || "Not Mentioned"}
                    </span>

                    <span className="badge bg-info text-dark">
                      👥 {job.vacancies || 1}
                    </span>
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => fetchApplicants(job._id)}
                    >
                      View Applicants
                    </button>
                    <Link
                      to={`/edit-job/${job._id}`}
                      className="btn btn-outline-warning btn-sm"
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {applications.length > 0 && (
        <div className="card shadow-lg border-0 mt-5">
          <div className="card-body">
            <h4 className="mb-4 text-primary">Applicants List</h4>

            {applications.map((app) => (
              <div key={app._id} className="border rounded p-3 mb-3">
                <h5>{app.applicant?.name}</h5>
                <p className="mb-1">📧 {app.applicant?.email}</p>
                {app.applicant?.resume && (
                  <div className="mt-2">
                    <a
                      href={`http://localhost:5000${app.applicant.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-primary me-2 mb-1"
                    >
                      👁 View Resume
                    </a>

                    <a
                      href={`http://localhost:5000${app.applicant.resume}`}
                      download
                      className="btn btn-sm btn-success"
                    >
                      ⬇ Download
                    </a>
                  </div>
                )}
                <div className="d-flex align-items-center gap-2 mt-3">
                  <select
                    className="form-select"
                    style={{ maxWidth: "220px" }}
                    value={app.status}
                    onChange={(e) => updateStatus(app._id, e.target.value)}
                  >
                    <option>Applied</option>
                    <option>Under Review</option>
                    <option>Interview</option>
                    <option>Selected</option>
                    <option>Rejected</option>
                  </select>
                </div>{" "}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecruiterDashboard;
