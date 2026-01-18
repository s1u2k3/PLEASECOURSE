const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  loginAdmin,
  getAllStudents,
  deleteStudent,
  getAdminStats,          // ✅ added
  getMonthlyEnrollments   // ✅ added
} = require("../controllers/adminController");

// ==============================
// PUBLIC
// ==============================
router.post("/login", loginAdmin);

// ==============================
// ADMIN PROTECTED
// ==============================
router.get("/stats", auth, getAdminStats);              // ✅ FIX
router.get("/students", auth, getAllStudents);
router.delete("/students/:id", auth, deleteStudent);
router.get("/monthly-enrollments", auth, getMonthlyEnrollments);

module.exports = router;
