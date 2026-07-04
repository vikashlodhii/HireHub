import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateJob() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("Full Time");
  const [experience, setExperience] = useState("Fresher");
  const [skills, setSkills] = useState("");
  const [vacancies, setVacancies] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${process.env.REACT_APP_API}/jobs/create`,
        {
          title,
          description,
          company,
          location,
          salary,
          jobType,
          experience,
          skills,
          vacancies,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Job Posted Successfully 🚀");

      setTitle("");
      setDescription("");
      setCompany("");
      setLocation("");
      setSalary("");
      setJobType("Full Time");
      setExperience("Fresher");
      setSkills("");
      setVacancies(1);

      navigate("/recruiter");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error posting job ❌");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 col-md-6 mx-auto">
        <h3 className="text-center text-primary mb-4">Post New Job 📝</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Company</label>
            <input
              type="text"
              className="form-control"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Salary (₹)</label>
            <input
              type="number"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              placeholder="500000"
              required
              min="0"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Job Type</label>

            <select
              className="form-select"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Experience</label>

            <input
              className="form-control"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="0-1 Years/ Freshers"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Skills (comma separated)</label>

            <input
              className="form-control"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Node, MongoDB"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Vacancies</label>

            <input
              type="number"
              className="form-control"
              value={vacancies}
              onChange={(e) => setVacancies(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
