import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    totalRecruiters: 0,
  });
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchJobs();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API}/users/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API}/users/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${process.env.REACT_APP_API}/jobs/admin/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${process.env.REACT_APP_API}/users/admin/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User Deleted Successfully");

      fetchUsers();
      fetchStats();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };
  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${process.env.REACT_APP_API}/jobs/admin/job/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Deleted Successfully");

      fetchJobs();
      fetchStats();
    } catch (err) {
      alert("Delete Failed");
    }
  };
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-danger">🛡️ Admin Dashboard</h1>
        <p className="text-muted">Manage Users, Jobs & Applications</p>
      </div>

      <div className="row">
        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <h2>👥</h2>
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <h2>💼</h2>
            <h3>{stats.totalJobs}</h3>
            <p>Total Jobs</p>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <h2>📄</h2>
            <h3>{stats.totalApplications}</h3>
            <p>Applications</p>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0 text-center p-4">
            <h2>🏢</h2>
            <h3>{stats.totalRecruiters}</h3>
            <p>Recruiters</p>
          </div>
        </div>
      </div>

      <div className="card shadow border-0 mt-5">
        <div className="card-body text-center">
          <h3>🚀 Welcome Admin</h3>
          <p>
            From here you can manage users, recruiters, jobs and applications.
          </p>
        </div>
      </div>
      <div className="card shadow border-0 mt-5">
        <div className="card-body">
          <h3 className="mb-4">👥 All Users</h3>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {user.role !== "admin" && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card shadow border-0 mt-5">
        <div className="card-body">
          <h3 className="mb-4">💼 All Jobs</h3>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>

                  <td>{job.company}</td>

                  <td>{job.location}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteJob(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
