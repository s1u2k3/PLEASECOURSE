const Course = require("../models/Course");

// ADD COURSE (ADMIN)
exports.addCourse = async (req, res) => {
  const { courseName, department, semester } = req.body;
  const course = await Course.create({ courseName, department, semester });
  res.json(course);
};

// GET ALL COURSES
exports.getCourses = async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(course);
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course Deleted Successfully" });
};
