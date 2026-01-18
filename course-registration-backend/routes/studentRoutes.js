const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  register,
  login,
  getProfile,
  changePassword
} = require("../controllers/studentController");

// Public
router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);
router.put("/change-password", auth, changePassword);


module.exports = router;
