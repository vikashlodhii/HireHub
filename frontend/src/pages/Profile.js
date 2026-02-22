import React from "react";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const token = localStorage.getItem("token");

  if (!token) return <h3 className="text-center mt-5">No User Logged In</h3>;

  const decoded = jwtDecode(token);

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">My Profile 👤</h2>

      <div className="card p-4 shadow mx-auto" style={{ width: "400px" }}>
        <p><strong>Name:</strong> {decoded.name}</p>
        <p><strong>Email:</strong> {decoded.email}</p>
        <p><strong>Role:</strong> {decoded.role}</p>
      </div>
    </div>
  );
}

export default Profile;
