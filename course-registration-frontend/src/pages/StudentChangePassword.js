import React, { useEffect, useState } from "react";
import API from "../services/api";

function StudentChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Protect route
  useEffect(() => {
    if (!token) {
      window.location = "/student-login";
    }
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();

    // Password match check
    if (form.newPassword !== form.confirmPassword) {
      setMessage("❌ New passwords do not match");
      return;
    }

    try {
      // 🔹 res removed to avoid ESLint warning
      await API.put("/students/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      setMessage("✅ Password updated successfully");

      // Clear form
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      setMessage("❌ Current password is incorrect");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Change Password</h4>
      <hr />

      {message && (
        <div className="alert alert-info text-center">
          {message}
        </div>
      )}

      <form onSubmit={submit}>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Current Password"
          value={form.currentPassword}
          onChange={(e) =>
            setForm({ ...form, currentPassword: e.target.value })
          }
          required
        />

        <input
          type="password"
          className="form-control mb-2"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          required
        />

        <button className="btn btn-warning w-100">
          Update Password
        </button>
      </form>
    </div>
  );
}

export default StudentChangePassword;
