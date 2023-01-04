const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/get-user-info-by-id", authMiddleware, getUserInfo);

module.exports = router;
