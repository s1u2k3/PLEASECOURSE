const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  department: String,
  semester: String
});

module.exports = mongoose.model("Course", courseSchema);
