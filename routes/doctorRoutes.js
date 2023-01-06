const express = require("express");
const router = express.Router();

const {
  getDoctorDetailById,
  updateDoctorProfile,
  changeAppointmentStatus,
  getDoctorDetailByUserId,
  getAppointmentsByDoctorId,
} = require("../controllers/doctorControllers");

const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/get-doctor-info-by-id", authMiddleware, getDoctorDetailById);
router.post("/update-doctor-profile", authMiddleware, updateDoctorProfile);
router.post(
  "/get-doctor-info-by-user-id",
  authMiddleware,
  getDoctorDetailByUserId
);
router.get(
  "/get-appointments-by-doctor-id",
  authMiddleware,
  getAppointmentsByDoctorId
);
router.post(
  "/change-appointment-status",
  authMiddleware,
  changeAppointmentStatus
);
module.exports = router;
