import React, { useEffect, useState } from "react";
import API from "../services/api";

function EnrollmentHistory() {
  const [history, setHistory] = useState([]);

  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token || !studentId) {
      window.location = "/student-login";
    }
  }, [token, studentId]);

  // Fetch enrollment history
  useEffect(() => {
    API.get(`/enroll/history/${studentId}`)
      .then((res) => setHistory(res.data))
      .catch((err) => console.log(err));
  }, [studentId]);

  return (
    <div className="container mt-5">
      <h4>Enrollment History</h4>
      <hr />

      {history.length === 0 && (
        <p className="text-danger">No courses enrolled yet.</p>
      )}

      {history.map((item, index) => (
        <div key={index} className="card mb-2">
          <div className="card-body">
            <h6 className="card-title">
              {item.courseId.courseName}
            </h6>
            <p className="card-text">
              Department: {item.courseId.department} <br />
              Semester: {item.courseId.semester}
            </p>
            <small className="text-muted">
              Enrolled on: {new Date(item.enrolledAt).toDateString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EnrollmentHistory;
