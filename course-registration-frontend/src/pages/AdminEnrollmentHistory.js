import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminEnrollmentHistory() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/enroll/admin/all").then(res => setData(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h4>Enrollment History</h4>
      <hr />
      {data.map((e, i) => (
        <div key={i} className="border p-2 mb-2">
          <b>{e.studentId.name}</b> ({e.studentId.regno}) <br />
          Course: {e.courseId.courseName}
        </div>
      ))}
    </div>
  );
}

export default AdminEnrollmentHistory;
