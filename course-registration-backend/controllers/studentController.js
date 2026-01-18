const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{
  req.body.password = await bcrypt.hash(req.body.password,10);
  await Student.create(req.body);
  res.json("Registered");
};

exports.login = async (req, res) => {
  try {
    const { regno, password } = req.body;

    const student = await Student.findOne({ regno });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      student: {
        _id: student._id,
        name: student.name,
        regno: student.regno
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const student = await Student.findById(req.user.id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, student.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }

  student.password = await bcrypt.hash(newPassword, 10);
  await student.save();

  res.json({ message: "Password changed successfully" });
};
