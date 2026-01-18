const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  addNews,
  getNews,
  toggleNews
} = require("../controllers/newsController");

router.get("/", getNews);
router.post("/add", auth, addNews);
router.put("/toggle/:id", auth, toggleNews);

module.exports = router;
