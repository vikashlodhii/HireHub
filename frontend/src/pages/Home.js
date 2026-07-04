import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
    fetchSavedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${process.env.REACT_APP_API}/jobs`);

      console.log("Jobs:", res.data);

      setJobs(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API}/applications/my`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const jobIds = res.data
        .filter((app) => app.job)
        .map((app) => app.job._id.toString());

      setAppliedJobs(jobIds);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${process.env.REACT_APP_API}/users/saved-jobs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const ids = res.data.map((job) => job._id.toString());

      setSavedJobs(ids);
    } catch (err) {
      console.log(err);
    }
  };
  const saveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${process.env.REACT_APP_API}/users/save-job/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);
      fetchSavedJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error Saving Job");
    }
  };
  const unsaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `${process.env.REACT_APP_API}/users/unsave-job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);
      fetchSavedJobs();
    } catch (err) {
      alert("Error Removing Job");
    }
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API}/applications/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Applied Successfully 🚀");
      fetchMyApplications();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="text-center text-white rounded-4 p-5 mb-5 shadow"
        style={{
          background: "linear-gradient(135deg,#0d6efd,#6610f2)",
        }}
      >
        <h1 className="fw-bold mb-3">Find Your Dream Job 🚀</h1>

        <p className="fs-5 mb-0">
          Discover thousands of opportunities from top companies.
        </p>
      </div>

      <div className="card shadow-lg border-0 rounded-4 p-4 mb-5">
        <div className="row">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search Jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="col-md-3 mb-2">
            <select
              className="form-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="">All Job Types</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="col-md-2 mb-2">
            <button className="btn btn-primary w-100" onClick={fetchJobs}>
              Search
            </button>
            <button
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={() => {
                setSearch("");
                setLocation("");
                setJobType("");
                fetchJobs();
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Oval
            height={60}
            width={60}
            color="#0d6efd"
            secondaryColor="#d1d1d1"
            strokeWidth={4}
          />
        </div>
      ) : (
        <div className="row">
          {jobs.length === 0 ? (
            <h4 className="text-center text-muted">No Jobs Found 😔</h4>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="col-lg-6 mb-4">
                <div
                  className="card border-0 shadow h-100"
                  style={{
                    borderRadius: "20px",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 35px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5 className="text-primary fw-bold mb-1">
                          {job.title}
                        </h5>

                        <div className="d-flex align-items-center mt-2">
                          <img
                            src={
                              job.companyLogo
                                ? `http://localhost:5000${job.companyLogo}`
                                : "https://ui-avatars.com/api/?name=" +
                                  job.company
                            }
                            alt="logo"
                            width="45"
                            height="45"
                            className="rounded-circle border me-3"
                          />

                          <div>
                            <h6 className="mb-0 fw-bold">{job.company}</h6>

                            <small className="text-muted">Hiring Company</small>
                          </div>
                        </div>
                      </div>

                      <span className="badge bg-success align-self-start">
                        {job.jobType || "Full Time"}
                      </span>
                    </div>

                    <p
                      className="text-secondary mt-3"
                      style={{
                        minHeight: "60px",
                      }}
                    >
                      {job.description}
                    </p>

                    <div className="mb-3">
                      <span className="badge bg-light text-dark me-2">
                        📍 {job.location}
                      </span>

                      <span className="badge bg-warning text-dark me-2">
                        💰 ₹ {job.salary || "Not Mentioned"}
                      </span>

                      <span className="badge bg-info">
                        📈 {job.experience || "Fresher"}
                      </span>
                    </div>

                    {job.skills?.length > 0 && (
                      <>
                        <h6>Required Skills</h6>

                        <div className="mb-3">
                          {job.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="badge rounded-pill bg-dark me-2 mb-2 px-3 py-2"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </>
                    )}

                    <p className="fw-semibold">
                      👥 <strong>Vacancies:</strong> {job.vacancies || 1}
                    </p>
                    <div className="d-flex gap-2 mt-3">
                      {savedJobs.includes(job._id.toString()) ? (
                        <button
                          className="btn btn-outline-secondary rounded-pill w-50"
                          onClick={() => unsaveJob(job._id)}
                        >
                          💔 Unsave
                        </button>
                      ) : (
                        <button
                          className="btn btn-outline-danger rounded-pill w-50"
                          onClick={() => saveJob(job._id)}
                        >
                          ❤️ Save
                        </button>
                      )}

                      {appliedJobs.includes(job._id.toString()) ? (
                        <button
                          className="btn btn-success rounded-pill w-50"
                          disabled
                        >
                          Applied ✅
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary rounded-pill w-50"
                          onClick={() => handleApply(job._id)}
                        >
                          Apply 🚀
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
