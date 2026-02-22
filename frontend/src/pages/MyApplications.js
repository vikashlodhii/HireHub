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

      const res = await axios.get(
        "http://localhost:5000/api/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);

    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Applications 📩</h2>

      {applications.length === 0 && <p>No applications yet</p>}

      {applications.map((app) => (
        <div
          key={app._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{app.job?.title}</h3>
          <p><b>Company:</b> {app.job?.company}</p>
          <p><b>Location:</b> {app.job?.location}</p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;
