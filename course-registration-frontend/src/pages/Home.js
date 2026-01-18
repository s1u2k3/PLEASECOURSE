import React from "react";
import { Link } from "react-router-dom";

const hoverStyle = {
  transition: "all 0.3s ease",
  cursor: "pointer"
};

const onHover = (e) => {
  e.currentTarget.style.background =
    "linear-gradient(135deg, #e3f2fd, #f1f9ff)";
  e.currentTarget.style.transform = "translateY(-6px)";
  e.currentTarget.style.boxShadow =
    "0 12px 30px rgba(13,110,253,0.25)";
};

const onLeave = (e) => {
  e.currentTarget.style.background = "#ffffff";
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow =
    "0 4px 12px rgba(0,0,0,0.08)";
};

function Home() {
  return (
    <div className="bg-light">

      {/* ================= HERO ================= */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">
            Online Course Registration Portal
          </h1>
          <p className="fs-5 text-secondary mb-4">
            A modern academic management platform for students and administrators
          </p>

          <div className="mt-4">
            <Link to="/student-register" className="btn btn-success me-3 px-4">
              Get Started
            </Link>
            <Link to="/student-login" className="btn btn-outline-light px-4">
              Student Login
            </Link>
          </div>
        </div>
      </section>

      {/* ================= EDUCATION NEWS ================= */}
      <section className="container py-5">
        <h3 className="fw-semibold mb-4">Education News & Updates</h3>

        <div className="row g-4">
          {[
            {
              title: "Skill-Based Courses Growing",
              text: "AI, Data Science, Cloud Computing and Cyber Security are now core university subjects.",
              source: "Education Times"
            },
            {
              title: "Digital Learning Expansion",
              text: "Universities worldwide are adopting blended and digital-first academic models.",
              source: "Global Edu Report"
            },
            {
              title: "Internship-Focused Education",
              text: "Institutions emphasize internships, live projects and industry exposure.",
              source: "University Grants"
            }
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="card border-0 h-100 p-4"
                style={hoverStyle}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                <h5 className="fw-semibold">{item.title}</h5>
                <p className="text-muted mt-2">{item.text}</p>
                <span className="text-muted small">
                  Source: {item.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= ABOUT ================= */}
<section className="container pb-5">
  <div className="row g-4 align-items-stretch">

    {/* LEFT ABOUT CARD */}
    <div className="col-md-6">
      <div
        className="card border-0 h-100 p-4"
        style={hoverStyle}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <h3 className="fw-semibold mb-3">About the Platform</h3>

        <p className="text-muted">
          The Online Course Registration Portal is a centralized academic
          management solution designed for modern educational institutions.
        </p>

        <p className="text-muted">
          It streamlines course enrollment, student administration, and
          institutional communication while ensuring transparency, security,
          and efficiency.
        </p>

        <hr />

        <div className="row text-muted small">
          <div className="col-6">✔ Cloud-ready architecture</div>
          <div className="col-6">✔ Role-based access</div>
          <div className="col-6">✔ Real-time updates</div>
          <div className="col-6">✔ Scalable system</div>
        </div>
      </div>
    </div>

    {/* RIGHT WHY CHOOSE US CARD */}
    <div className="col-md-6">
      <div
        className="card border-0 h-100 p-4"
        style={hoverStyle}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <h5 className="fw-semibold mb-3">Why Choose Our Platform?</h5>

        <ul className="text-muted mb-0">
          <li>Centralized academic operations</li>
          <li>Secure JWT-based authentication</li>
          <li>Live dashboards for students & admins</li>
          <li>Industry-ready system design</li>
          <li>Deployment-friendly architecture</li>
        </ul>
      </div>
    </div>

  </div>
</section>


      {/* ================= FEATURES ================= */}
      <section className="container pb-5">
        <h3 className="fw-semibold mb-4">Core Features</h3>

        <div className="row g-4">
          {[
            {
              title: "Student Dashboard",
              text: "Enroll in courses, view notices, manage profile and track enrollment history."
            },
            {
              title: "Admin Panel",
              text: "Manage students, courses, enrollments and academic notices."
            },
            {
              title: "Secure System",
              text: "JWT authentication and protected APIs ensure data security."
            }
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div
                className="card border-0 h-100 p-4"
                style={hoverStyle}
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
              >
                <h5 className="fw-semibold">{item.title}</h5>
                <p className="text-muted mt-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OPPORTUNITIES & RESPONSIBILITIES ================= */}
      <section className="container pb-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div
              className="card border-0 h-100 p-4"
              style={hoverStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <h4>Opportunities for Students</h4>
              <ul className="text-muted mt-3">
                <li>Diverse academic programs</li>
                <li>Fast & transparent enrollment</li>
                <li>Real-time academic updates</li>
                <li>Enhanced digital learning</li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="card border-0 h-100 p-4"
              style={hoverStyle}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}
            >
              <h4>Our Responsibilities</h4>
              <ul className="text-muted mt-3">
                <li>Accurate academic records</li>
                <li>Secure data handling</li>
                <li>Timely communication</li>
                <li>Operational reliability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="container pb-5">
        <h3 className="fw-semibold mb-2">Our Location</h3>
        <p className="text-muted mb-3">
          ABC Institute of Technology, Kolkata, West Bengal, India
        </p>

        <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden">
          <iframe
            title="location"
            src="https://www.google.com/maps?q=Kolkata&output=embed"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">
          <h4 className="fw-semibold mb-3">Contact Information</h4>
          <p className="mb-1">support@courseregistration.com</p>
          <p className="mb-1">+91-9876543210</p>
          <p className="text-secondary">Office Hours: 9:00 AM – 5:00 PM</p>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-black text-secondary text-center py-3">
        © {new Date().getFullYear()} Online Course Registration Portal. All rights reserved.
      </footer>

    </div>
  );
}

export default Home;
