const Enrollment = require("../models/Enrollment");

// ==============================
// STUDENT: ENROLL COURSE
// ==============================
exports.enrollCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const exists = await Enrollment.findOne({ studentId, courseId });
    if (exists) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      studentId,
      courseId
    });

    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// STUDENT: ENROLLMENT HISTORY
// ==============================
exports.enrollHistory = async (req, res) => {
  try {
    const data = await Enrollment.find({
      studentId: req.params.studentId
    }).populate("courseId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// ADMIN: ALL ENROLLMENTS
// ==============================
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("studentId", "name regno")
      .populate("courseId", "courseName department semester");

    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==============================
// CHECK ENROLLMENT (DISABLE BUTTON)
// ==============================
exports.checkEnrollment = async (req, res) => {
  try {
    const { studentId, courseId } = req.query;
    const exists = await Enrollment.findOne({ studentId, courseId });
    res.json({ enrolled: !!exists });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
