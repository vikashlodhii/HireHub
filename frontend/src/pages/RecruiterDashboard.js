import React, { useEffect, useState } from "react";
import axios from "axios";

function RecruiterDashboard() {
  const [stats, setStats] = useState(null);
  const [myJobs, setMyJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  // ================= LOAD DATA =================
  useEffect(() => {
    const loadData = async () => {
      try {
        const statsRes = await axios.get(
          "http://localhost:5000/api/jobs/recruiter/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const jobsRes = await axios.get(
          "http://localhost:5000/api/jobs/my-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(statsRes.data);
        setMyJobs(jobsRes.data);

      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      loadData();
    }
  }, [token]);

  // ================= FETCH APPLICANTS =================
  const fetchApplicants = async (jobId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setApplications(res.data);
    } catch (error) {
      alert("Error fetching applicants");
    }
  };

  // ================= DELETE JOB =================
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/delete/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Reload jobs & stats
      const jobsRes = await axios.get(
        "http://localhost:5000/api/jobs/my-jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const statsRes = await axios.get(
        "http://localhost:5000/api/jobs/recruiter/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMyJobs(jobsRes.data);
      setStats(statsRes.data);

    } catch (error) {
      alert("Delete failed ❌");
    }
  };

  // ================= EDIT JOB =================
  const handleEdit = async (job) => {
    const newTitle = prompt("Enter new title", job.title);
    const newLocation = prompt("Enter new location", job.location);

    if (!newTitle || !newLocation) return;

    try {
      await axios.put(
        `http://localhost:5000/api/jobs/update/${job._id}`,
        {
          title: newTitle,
          location: newLocation,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const jobsRes = await axios.get(
        "http://localhost:5000/api/jobs/my-jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMyJobs(jobsRes.data);

    } catch (error) {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        Recruiter Dashboard 📊
      </h2>

      {/* ================= STATS ================= */}
      {stats && (
        <div className="row text-center mb-5">
          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <h4>Total Jobs</h4>
              <h2 className="text-primary">{stats.totalJobs}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <h4>Total Applications</h4>
              <h2 className="text-success">{stats.totalApplications}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 p-4">
              <h4>Total Applicants</h4>
              <h2 className="text-danger">{stats.totalApplicants}</h2>
            </div>
          </div>
        </div>
      )}

      {/* ================= MY JOBS ================= */}
      <h4 className="mb-3">My Posted Jobs 👇</h4>

      <div className="row">
        {myJobs.map((job) => (
          <div key={job._id} className="col-md-6 mb-4">
            <div className="card shadow border-0 p-3">
              <h5>{job.title}</h5>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>

              <div className="d-flex gap-2 mt-2">
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => fetchApplicants(job._id)}
                >
                  View Applicants
                </button>

                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(job)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= APPLICANTS LIST ================= */}
      {applications.length > 0 && (
        <div className="card shadow p-4 mt-4">
          <h5>Applicants List</h5>

          {applications.map((app) => (
            <div key={app._id} className="border-bottom pb-2 mb-2">
              <p><strong>Name:</strong> {app.applicant?.name}</p>
              <p><strong>Email:</strong> {app.applicant?.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecruiterDashboard;
