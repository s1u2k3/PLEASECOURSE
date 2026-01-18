import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Public
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import AdminLogin from "./pages/AdminLogin";

// Student
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentChangePassword from "./pages/StudentChangePassword";
import EnrollmentHistory from "./pages/EnrollmentHistory";

// Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageCourses from "./pages/AdminManageCourses";
import AdminManageStudents from "./pages/AdminManageStudents";
import AdminEnrollmentHistory from "./pages/AdminEnrollmentHistory";
import AdminNews from "./pages/AdminNews";   // ✅ NOTICE PAGE

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Student */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/student-change-password" element={<StudentChangePassword />} />
        <Route path="/enrollment-history" element={<EnrollmentHistory />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-manage-courses" element={<AdminManageCourses />} />
        <Route path="/admin-manage-students" element={<AdminManageStudents />} />
        <Route path="/admin-enrollments" element={<AdminEnrollmentHistory />} />
        <Route path="/admin-news" element={<AdminNews />} /> {/* ✅ */}
      </Routes>
    </Router>
  );
}

export default App;
