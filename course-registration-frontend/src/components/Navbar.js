import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Course Registration
        </Link>

        <ul className="navbar-nav ms-auto align-items-center">

          {/* Home always */}
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          {/* Public (Home only) */}
          {!token && isHomePage && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/student-register">Register</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/student-login">Student Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-login">Admin Login</Link>
              </li>
            </>
          )}

          {/* 🎓 STUDENT LOGGED IN */}
{token && role === "student" && (
  <>
    <li className="nav-item">
      <Link className="nav-link" to="/student-dashboard">
        Dashboard
      </Link>
    </li>

    <li className="nav-item">
      <Link className="nav-link" to="/student-change-password">
        Change Password
      </Link>
    </li>

    <li className="nav-item ms-2">
      <button
        className="btn btn-danger btn-sm"
        onClick={logout}
      >
        Logout
      </button>
    </li>
  </>
)}


          {/* Admin */}
          {token && role === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-dashboard">Admin Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin-manage-courses">Manage Courses</Link>
              </li>
              <li className="nav-item ms-2">
                <button className="btn btn-danger btn-sm" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
