import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

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

      setJobs(res.data);
    } catch (err) {
      console.log(err);
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
      toast.error("Error Removing Job");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">❤️ Saved Jobs</h2>

      {jobs.length === 0 ? (
        <div className="alert alert-info">No Saved Jobs</div>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <div key={job._id} className="col-md-6 mb-4">
              <div className="card shadow h-100">
                <div className="card-body">
                  <h4>{job.title}</h4>

                  <h6>{job.company}</h6>

                  <p>{job.description}</p>

                  <span className="badge bg-primary me-2">
                    📍 {job.location}
                  </span>

                  <span className="badge bg-success">{job.jobType}</span>
                  <div className="mt-3">
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => unsaveJob(job._id)}
                    >
                      ❌ Remove from Saved
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;
