import React, { useState } from "react";
import { Link } from "react-router-dom";   // ✅ FIXED
import API from "../services/api";

function StudentLogin() {
  const [data, setData] = useState({
    regno: "",
    password: ""
  });

  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/students/login", data);

      // Save token & studentId
      localStorage.setItem("token", res.data.token);
localStorage.setItem("role", "student");
localStorage.setItem("studentId", res.data.student._id);


      window.location = "/student-dashboard";
    } catch (err) {
      setError("❌ Invalid Registration Number or Password");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Student Login</h4>
      <hr />

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Registration Number"
          value={data.regno}
          onChange={(e) =>
            setData({ ...data, regno: e.target.value })
          }
          required
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
          required
        />

        <button className="btn btn-success w-100">
          Login
        </button>
      </form>

      {/* ✅ Register link */}
      <p className="mt-3 text-center">
        New user?{" "}
        <Link to="/student-register">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default StudentLogin;
