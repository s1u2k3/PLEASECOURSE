import React, { useEffect, useState } from "react";
import API from "../services/api";

function AdminNews() {
  const [title, setTitle] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get("/news").then(res => setNews(res.data));
  }, []);

  const addNotice = async () => {
    if (!title || !expiryDate) return;
    await API.post("/news/add", { title, expiryDate });
    setTitle(""); setExpiryDate("");
    API.get("/news").then(res => setNews(res.data));
  };

  const toggleNotice = async (id) => {
    await API.put(`/news/toggle/${id}`);
    API.get("/news").then(res => setNews(res.data));
  };

  return (
    <div className="container mt-5">
      <h3>Manage Notices</h3>
      <hr />

      <div className="card p-3 mb-4 shadow-sm">
        <input className="form-control mb-2" placeholder="Notice title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="date" className="form-control mb-2" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
        <button className="btn btn-primary" onClick={addNotice}>Add Notice</button>
      </div>

      {news.map(n => (
        <div key={n._id} className="card shadow-sm mb-2 p-2">
          <b>{n.title}</b>
          <small className="text-muted">Expires: {new Date(n.expiryDate).toDateString()}</small>
          <button className={`btn btn-sm float-end ${n.isActive ? "btn-danger" : "btn-success"}`} onClick={() => toggleNotice(n._id)}>
            {n.isActive ? "Hide" : "Show"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminNews;
