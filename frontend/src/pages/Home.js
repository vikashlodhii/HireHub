import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Oval } from "react-loader-spinner";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
    fetchMyApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/jobs?search=${search}`
      );

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
        "http://localhost:5000/api/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jobIds = res.data.map(app => app.job._id);
      setAppliedJobs(jobIds);

    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:5000/api/applications/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Applied Successfully 🚀");
      fetchMyApplications();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error ❌");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">
        Available Jobs 🚀
      </h2>

      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn btn-dark" onClick={fetchJobs}>
          Search
        </button>
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
          {jobs.map((job) => (
            <div key={job._id} className="col-md-6 mb-4">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h5 className="fw-bold">{job.title}</h5>
                  <p>{job.description}</p>
                  <p><strong>Company:</strong> {job.company}</p>
                  <p><strong>Location:</strong> {job.location}</p>

                  {appliedJobs.includes(job._id) ? (
                    <button className="btn btn-success mt-2" disabled>
                      Applied ✅
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary mt-2"
                      onClick={() => handleApply(job._id)}
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
