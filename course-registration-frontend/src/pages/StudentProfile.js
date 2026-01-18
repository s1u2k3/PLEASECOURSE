import React, { useEffect, useState } from "react";
import API from "../services/api";

function StudentProfile() {
  const [student, setStudent] = useState(null);

  const token = localStorage.getItem("token");

  // Protect route
  useEffect(() => {
    if (!token) {
      window.location = "/student-login";
    }
  }, [token]);

  // Fetch profile
  useEffect(() => {
    API.get("/students/profile")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h4>My Profile</h4>
      <hr />

      {!student && <p>Loading profile...</p>}

      {student && (
        <div className="card">
          <div className="card-body">
            <p><b>Name:</b> {student.name}</p>
            <p><b>Registration No:</b> {student.regno}</p>
            <p><b>Email:</b> {student.email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
