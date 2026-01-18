const mongoose = require("mongoose");

module.exports = mongoose.model("Student", new mongoose.Schema({
  name:String,
  regno:String,
  email:String,
  password:String
}));
