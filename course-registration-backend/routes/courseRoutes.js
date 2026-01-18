const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

// ADMIN
router.post("/add", auth, addCourse);
router.put("/update/:id", auth, updateCourse);
router.delete("/delete/:id", auth, deleteCourse);

// ADMIN + STUDENT
router.get("/", auth, getCourses);

module.exports = router;
