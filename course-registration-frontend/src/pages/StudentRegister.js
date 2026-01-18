import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function StudentRegister() {
  const [form, setForm] = useState({
    name: "",
    regno: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/students/register", form);

      setMessage("✅ Registration successful! Redirecting to login...");

      // Clear form
      setForm({
        name: "",
        regno: "",
        email: "",
        password: ""
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/student-login");
      }, 2000);

    } catch (err) {
      setMessage("❌ Registration failed. Registration number may already exist.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Student Registration</h4>
      <hr />

      {message && (
        <div className="alert alert-info text-center">
          {message}
        </div>
      )}

      <form onSubmit={submit}>
        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          required
        />

        <input
          className="form-control mb-2"
          placeholder="Registration Number"
          value={form.regno}
          onChange={(e) =>
            setForm({ ...form, regno: e.target.value })
          }
          required
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account?{" "}
        <Link to="/student-login">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default StudentRegister;
