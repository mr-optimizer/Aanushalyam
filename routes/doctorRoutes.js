const express = require("express");
const router = express.Router();

const {
  getDoctorDetailById,
  updateDoctorProfile,
} = require("../controllers/doctorControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/get-doctor-info-by-user-id", authMiddleware, getDoctorDetailById);
router.post("/update-doctor-profile", authMiddleware, updateDoctorProfile);
module.exports = router;
