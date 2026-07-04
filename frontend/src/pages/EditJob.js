import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "Full Time",
    experience: "Fresher",
    skills: "",
    vacancies: 1,
  });

  useEffect(() => {
  fetchJob();
}, []);

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/jobs`);

      const currentJob = res.data.find((j) => j._id === id);

      if (currentJob) {
        setJob({
          ...currentJob,
          skills: currentJob.skills ? currentJob.skills.join(", ") : "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 col-lg-8 mx-auto">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Edit Job</h3>
        </div>

        <div className="card-body p-4">
          <form>
            <div className="mb-3">
              <label className="form-label">Job Title</label>

              <input
                type="text"
                className="form-control"
                name="title"
                value={job.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Company</label>

              <input
                type="text"
                className="form-control"
                name="company"
                value={job.company}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                rows="4"
                className="form-control"
                name="description"
                value={job.description}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Location</label>

                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={job.location}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Salary</label>

                <input
                  type="number"
                  className="form-control"
                  name="salary"
                  value={job.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Job Type</label>

                <select
                  className="form-select"
                  name="jobType"
                  value={job.jobType}
                  onChange={handleChange}
                >
                  <option>Full Time</option>

                  <option>Part Time</option>

                  <option>Internship</option>

                  <option>Remote</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Experience</label>

                <input
                  className="form-control"
                  name="experience"
                  value={job.experience}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Skills</label>

              <input
                className="form-control"
                name="skills"
                value={job.skills}
                onChange={handleChange}
                placeholder="React, Node, MongoDB"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Vacancies</label>

              <input
                type="number"
                className="form-control"
                name="vacancies"
                value={job.vacancies}
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/recruiter")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Update Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.REACT_APP_API}/jobs/update/${id}`,
        {
          ...job,
          skills: job.skills.split(",").map((item) => item.trim()),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Job Updated Successfully 🚀");

      navigate("/recruiter");
    } catch (err) {
      console.log(err);

      toast.error("Update Failed ❌");
    }
  }
}

export default EditJob;
