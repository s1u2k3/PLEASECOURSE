const Admin = require("../models/Admin");
const Student = require("../models/Student");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==============================
// ADMIN LOGIN
// ==============================
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// ADMIN STATS (✅ THIS FIXES 0,0,0)
// ==============================
exports.getAdminStats = async (req, res) => {
  try {
    const students = await Student.countDocuments();
    const courses = await Course.countDocuments();
    const enrollments = await Enrollment.countDocuments();

    res.json({
      students,
      courses,
      enrollments
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// GET ALL STUDENTS
// ==============================
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// DELETE STUDENT
// ==============================
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    await Enrollment.deleteMany({ studentId: req.params.id });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// MONTHLY ENROLLMENTS (CHART)
// ==============================
exports.getMonthlyEnrollments = async (req, res) => {
  try {
    const data = await Enrollment.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const months = Array(12).fill(0);
    data.forEach(item => {
      months[item._id - 1] = item.total;
    });

    res.json(months);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
