import React, { useState } from "react";
import API from "../services/api";

function AdminLogin() {
  const [data, setData] = useState({ username:"", password:"" });

  const submit = async () => {
    const res = await API.post("/admin/login", data);
    localStorage.setItem("token", res.data.token);
localStorage.setItem("role", "admin");
window.location = "/admin-dashboard";

  };

  return (
    <div className="container mt-5">
      <h4>Admin Login</h4><hr/>
      <input className="form-control mb-2" placeholder="Username" onChange={e=>setData({...data,username:e.target.value})}/>
      <input type="password" className="form-control mb-2" placeholder="Password" onChange={e=>setData({...data,password:e.target.value})}/>
      <button className="btn btn-danger" onClick={submit}>Login</button>
    </div>
  );
}
export default AdminLogin;
