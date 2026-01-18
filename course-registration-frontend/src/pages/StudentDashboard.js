import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [notices, setNotices] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [message, setMessage] = useState("");

  const studentId = localStorage.getItem("studentId");
  const token = localStorage.getItem("token");

  // Protect route
  useEffect(() => {
    if (!token || !studentId) {
      window.location = "/student-login";
    }
  }, [token, studentId]);

  // Load data
  useEffect(() => {
    API.get("/courses").then(res => setCourses(res.data));
    API.get("/news").then(res => setNotices(res.data));
    API.get(`/enroll/history/${studentId}`)
      .then(res => setEnrolledCourses(res.data.map(e => e.courseId._id)));
  }, [studentId]);

  const enroll = async (courseId) => {
    try {
      await API.post("/enroll/enroll", { studentId, courseId });
      setEnrolledCourses([...enrolledCourses, courseId]);
      setMessage("✅ Course Enrolled Successfully");
    } catch {
      setMessage("⚠️ Already enrolled");
    }
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center">
        <h3>Student Dashboard</h3>
        <div>
          <Link to="/student-profile" className="btn btn-secondary btn-sm me-2">
            My Profile
          </Link>
          <Link to="/enrollment-history" className="btn btn-primary btn-sm">
            Enrollment History
          </Link>
        </div>
      </div>

      <hr />

      {/* NOTICES */}
      <div className="mb-4">
        <h5>📢 Notices</h5>
        {notices.length === 0 && <p className="text-muted">No notices</p>}
        {notices.map(n => (
          <div key={n._id} className="alert alert-warning py-2">
            {n.title}
          </div>
        ))}
      </div>

      {message && <div className="alert alert-info">{message}</div>}

      {/* COURSES */}
      <h5>📚 Available Courses</h5>
      <div className="row">
        {courses.map(course => {
          const isEnrolled = enrolledCourses.includes(course._id);

          return (
            <div key={course._id} className="col-md-6">
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h6>{course.courseName}</h6>
                  <p className="mb-1">Department: {course.department}</p>
                  <p>Semester: {course.semester}</p>

                  <button
                    className="btn btn-sm btn-success"
                    disabled={isEnrolled}
                    onClick={() => enroll(course._id)}
                  >
                    {isEnrolled ? "Enrolled" : "Enroll"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default StudentDashboard;
