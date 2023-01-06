const express = require("express");
const router = express.Router();

const {
  loginUser,
  getUserInfo,
  registerUser,
  bookAppointment,
  applyDoctorAccount,
  getAllApprovedDoctors,
  getAppointmentsByUserId,
  checkBookingAvailability,
  deleteAllSeenNotifications,
  markAllNotificationsAsSeen,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-all-approved-doctors", authMiddleware, getAllApprovedDoctors);
router.get(
  "/get-appointments-by-user-id",
  authMiddleware,
  getAppointmentsByUserId
);
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
router.post(
  "/check-booking-availability",
  authMiddleware,
  checkBookingAvailability
);
router.post("/book-appointment", authMiddleware, bookAppointment);
module.exports = router;
