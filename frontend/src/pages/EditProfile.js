import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function EditProfile() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [form, setForm] = useState({
    name: "",
    skills: "",
    education: "",
    experience: "",
    companyName: "",
    companyDescription: "",
    location: "",
    website: "",
  });



  const fetchProfile = useCallback(async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForm(res.data);
  } catch (err) {
    console.log(err);
  }
}, [token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  fetchProfile();
}, [fetchProfile]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${process.env.REACT_APP_API}/users/update-profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Profile Updated Successfully");

      navigate("/profile");
    } catch (err) {
      console.log(err.response?.data);
      console.log(err);

      toast.error(err.response?.data?.error || "Update Failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow p-4 col-md-8 mx-auto">
        <h3 className="text-center mb-4">Edit Profile</h3>

        <form onSubmit={updateProfile}>
          <input
            className="form-control mb-3"
            name="name"
            placeholder="Name"
            value={form.name || ""}
            onChange={handleChange}
          />
          {role === "jobseeker" ? (
            <>
              <input
                className="form-control mb-3"
                name="skills"
                placeholder="Skills"
                value={form.skills || ""}
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                name="education"
                placeholder="Education"
                value={form.education || ""}
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                name="experience"
                placeholder="Experience"
                value={form.experience || ""}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <input
                className="form-control mb-3"
                name="companyName"
                placeholder="Company Name"
                value={form.companyName || ""}
                onChange={handleChange}
              />

              <textarea
                className="form-control mb-3"
                name="companyDescription"
                placeholder="Company Description"
                value={form.companyDescription || ""}
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                name="location"
                placeholder="Location"
                value={form.location || ""}
                onChange={handleChange}
              />

              <input
                className="form-control mb-3"
                name="website"
                placeholder="Website"
                value={form.website || ""}
                onChange={handleChange}
              />
            </>
          )}

          <button className="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
