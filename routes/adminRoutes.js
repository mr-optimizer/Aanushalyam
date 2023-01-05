const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllDoctors,
  changeDoctorStatus
} = require("../controllers/adminControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/get-all-users", authMiddleware, getAllUsers);
router.get("/get-all-doctors", authMiddleware, getAllDoctors);
router.post("/change-doctor-account-status", authMiddleware, changeDoctorStatus);
module.exports = router;
