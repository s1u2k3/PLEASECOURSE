import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ courseName: "", department: "", semester: "" });
  const [editId, setEditId] = useState(null);

  const fetchCourses = () => {
    API.get("/courses").then(res => setCourses(res.data));
  };

  useEffect(() => { fetchCourses(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    editId
      ? await API.put(`/courses/update/${editId}`, form)
      : await API.post("/courses/add", form);

    setForm({ courseName: "", department: "", semester: "" });
    setEditId(null);
    fetchCourses();
  };

  return (
    <div className="container mt-5">
      <h4>Admin – Manage Courses</h4>
      <hr />

      <form onSubmit={submit} className="mb-4">
        {["courseName", "department", "semester"].map((f, i) => (
          <input
            key={i}
            className="form-control mb-2"
            placeholder={f}
            value={form[f]}
            onChange={e => setForm({ ...form, [f]: e.target.value })}
            required
          />
        ))}
        <button className="btn btn-primary">
          {editId ? "Update Course" : "Add Course"}
        </button>
      </form>

      {courses.map(c => (
        <div key={c._id} className="border p-2 mb-2">
          <b>{c.courseName}</b> | {c.department} | {c.semester}
          <div className="float-end">
            <button className="btn btn-warning btn-sm me-2" onClick={() => {
              setEditId(c._id);
              setForm(c);
            }}>Edit</button>
            <button className="btn btn-danger btn-sm" onClick={() => API.delete(`/courses/delete/${c._id}`).then(fetchCourses)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminManageCourses;
