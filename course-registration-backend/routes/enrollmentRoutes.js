const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  enrollCourse,
  enrollHistory,
  getAllEnrollments,
  checkEnrollment
} = require("../controllers/enrollmentController");

// STUDENT
router.post("/enroll", auth, enrollCourse);
router.get("/history/:studentId", auth, enrollHistory);
router.get("/check", auth, checkEnrollment);

// ADMIN
router.get("/admin/all", auth, getAllEnrollments);

module.exports = router;
