import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminManageStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    API.get("/admin/students").then(res => setStudents(res.data));
  }, []);

  const remove = async (id) => {
    if (window.confirm("Delete student?")) {
      await API.delete(`/admin/students/${id}`);
      setStudents(students.filter(s => s._id !== id));
    }
  };

  return (
    <div className="container mt-5">
      <h4>Manage Students</h4>
      <hr />
      {students.map(s => (
        <div key={s._id} className="border p-2 mb-2">
          {s.name} ({s.regno})
          <button className="btn btn-danger btn-sm float-end" onClick={() => remove(s._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminManageStudents;
