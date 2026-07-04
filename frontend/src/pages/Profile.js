import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [user, setUser] = useState({});
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadResume = async () => {
    if (!resume) {
      toast.error("Please select a resume");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", resume);

      await axios.post(
        `${process.env.REACT_APP_API}/users/upload-resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Resume Uploaded Successfully");

      fetchProfile();
    } catch (err) {
      console.log(err);
      toast.error("Upload Failed");
    }
  };

  if (!token) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">No User Logged In</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg">
            <div
              className="text-center text-white p-5"
              style={{
                background: "linear-gradient(135deg,#0d6efd,#6610f2)",
              }}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}`}
                alt="Profile"
                width="120"
                height="120"
                className="rounded-circle border border-4 border-white"
              />

              <h3 className="mt-3 fw-bold">{user.name}</h3>

              <p>{user.role?.toUpperCase()}</p>
            </div>

            <div className="card-body p-5">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h6 className="text-muted">Name</h6>

                  <p className="fs-5 mb-0">{user.name}</p>
                </div>

                <div className="col-md-6 mb-4">
                  <h6 className="text-muted">Email</h6>

                  <p className="fs-5 mb-0">{user.name}</p>
                </div>

                <div className="col-md-6 mb-4">
                  <h6 className="text-muted">Role</h6>

                  <span className="badge bg-primary">{user.role}</span>
                </div>
                <div className="col-md-6 mb-4">
                  <h6 className="text-muted">Account Status</h6>

                  <span className="badge bg-success">Active</span>
                </div>
              </div>

              <hr />

              {/* Job Seeker Profile */}

              {role === "jobseeker" && (
                <>
                  <h5 className="fw-bold mb-2">Skills</h5>
                  <p>{user.skills || "Not Added"}</p>

                  <hr />

                  <h5 className="fw-bold">Education</h5>

                  <p>{user.education || "Not Added"}</p>

                  <hr />

                  <h5 className="fw-bold">Experience</h5>

                  <p>{user.experience || "Not Added"}</p>

                  <hr />
                </>
              )}

              {/* Recruiter Profile */}

              {role === "recruiter" && (
                <>
                  <h5 className="fw-bold">Company Name</h5>

                  <p>{user.companyName || "Not Added"}</p>

                  <hr />

                  <h4 className="mb-3">Company Description</h4>

                  <p>{user.companyDescription || "Not Added"}</p>

                  <hr />

                  <h4 className="mb-3">Company Location</h4>

                  <p>{user.location || "Not Added"}</p>

                  <hr />

                  <h4 className="mb-3">Website</h4>

                  <p>{user.website || "Not Added"}</p>

                  <hr />
                </>
              )}

              <h4 className="mb-3">Resume</h4>

              <input
                type="file"
                className="form-control"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />

              <button className="btn btn-success mt-3" onClick={uploadResume}>
                Upload Resume
              </button>

              {user.resume && (
                <div className="mt-3">
                  <a
                    href={`http://localhost:5000${user.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary me-2"
                  >
                    👁 View Resume
                  </a>

                  <a
                    href={`http://localhost:5000${user.resume}`}
                    download
                    className="btn btn-success"
                  >
                    ⬇ Download Resume
                  </a>
                </div>
              )}

              <div className="text-center mt-5">
                <button
                  className="btn btn-primary me-3"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </button>

                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Profile Link Copied");
                  }}
                >
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
