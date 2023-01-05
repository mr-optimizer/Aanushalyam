const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserInfo,
  applyDoctorAccount,
  markAllNotificationsAsSeen,
  deleteAllSeenNotifications,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/get-user-info-by-id", authMiddleware, getUserInfo);
router.post("/apply-doctor-account", authMiddleware, applyDoctorAccount);
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  markAllNotificationsAsSeen
);
router.post(
  "/delete-all-seen-notifications",
  authMiddleware,
  deleteAllSeenNotifications
);
module.exports = router;
