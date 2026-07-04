import React, { useEffect, useState } from "react";
import axios from "axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${process.env.REACT_APP_API}/applications/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">My Applications</h2>

        <p className="text-muted">Track every job you have applied for.</p>
      </div>

      <div className="row">
        {applications.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info text-center">
              You haven't applied to any jobs yet.
            </div>
          </div>
        ) : (
          applications.map((app) => (
            <div key={app._id} className="col-lg-6 mb-4">
              <div
                className="card shadow-lg border-0 h-100"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="fw-bold text-primary">{app.job?.title}</h4>

                      <h6 className="text-secondary">🏢 {app.job?.company}</h6>
                    </div>

                    <span
                      className={`badge align-self-start ${
                        app.status === "Applied"
                          ? "bg-primary"
                          : app.status === "Under Review"
                            ? "bg-warning text-dark"
                            : app.status === "Interview"
                              ? "bg-info text-dark"
                              : app.status === "Selected"
                                ? "bg-success"
                                : "bg-danger"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <hr />

                  <p>
                    📍 <strong>Location:</strong> {app.job?.location}
                  </p>

                  <p>
                    💰 <strong>Salary:</strong> ₹{" "}
                    {app.job?.salary || "Not Mentioned"}
                  </p>

                  <p>
                    💼 <strong>Job Type:</strong>{" "}
                    {app.job?.jobType || "Full Time"}
                  </p>

                  <p>
                    📈 <strong>Experience:</strong>{" "}
                    {app.job?.experience || "Fresher"}
                  </p>

                  {app.job?.skills?.length > 0 && (
                    <>
                      <h6 className="mt-3">Skills Required</h6>

                      <div className="mb-3">
                        {app.job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="badge bg-primary me-2 mb-2"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  <button
                    className={`btn w-100 ${
                      app.status === "Selected"
                        ? "btn-success"
                        : app.status === "Rejected"
                          ? "btn-danger"
                          : app.status === "Interview"
                            ? "btn-info"
                            : app.status === "Under Review"
                              ? "btn-warning"
                              : "btn-outline-primary"
                    }`}
                    disabled
                  >
                    {app.status === "Applied" && "✅ Application Submitted"}
                    {app.status === "Under Review" && "🟡 Under Review"}
                    {app.status === "Interview" && "🔵 Interview Scheduled"}
                    {app.status === "Selected" &&
                      "🎉 Congratulations! Selected"}
                    {app.status === "Rejected" && "❌ Application Rejected"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyApplications;
