import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    courses: 0,
    enrollments: 0
  });

  useEffect(() => {
    API.get("/admin/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  const barData = {
    labels: ["Students", "Courses", "Enrollments"],
    datasets: [
      {
        label: "System Overview",
        data: [stats.students, stats.courses, stats.enrollments],
        backgroundColor: ["#0d6efd", "#198754", "#ffc107"]
      }
    ]
  };

  const pieData = {
    labels: ["Students", "Courses", "Enrollments"],
    datasets: [
      {
        data: [stats.students, stats.courses, stats.enrollments],
        backgroundColor: ["#0d6efd", "#198754", "#ffc107"]
      }
    ]
  };

  return (
    <div className="container mt-5">
      <h3 className="page-title">Admin Dashboard</h3>
      <hr />

      {/* KPI CARDS */}
      <div className="row mb-4">
        {[
          { label: "Students", value: stats.students, color: "primary" },
          { label: "Courses", value: stats.courses, color: "success" },
          { label: "Enrollments", value: stats.enrollments, color: "warning" }
        ].map((item, i) => (
          <div key={i} className="col-md-4">
            <div className="card shadow-soft text-center p-4 dashboard-card">
              <h2 className={`text-${item.color}`}>{item.value}</h2>
              <p className="text-muted">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-soft p-3">
            <h6 className="section-title text-center">
              📊 Bar Chart Overview
            </h6>
            <Bar data={barData} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-soft p-3">
            <h6 className="section-title text-center">
              🧩 Distribution
            </h6>
            <Pie data={pieData} />
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="card shadow-soft p-3">
        <h6 className="section-title">⚙️ Admin Actions</h6>

        <div className="list-group">
          <Link to="/admin-manage-courses" className="list-group-item list-group-item-action">
            📚 Manage Courses
          </Link>
          <Link to="/admin-manage-students" className="list-group-item list-group-item-action">
            👨‍🎓 Manage Students
          </Link>
          <Link to="/admin-enrollments" className="list-group-item list-group-item-action">
            📄 Enrollment History
          </Link>
          <Link to="/admin-news" className="list-group-item list-group-item-action">
            📢 Manage Notices
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
