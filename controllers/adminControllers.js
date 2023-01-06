const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while loading users", success: false, error });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while loading doctors", success: false, error });
  }
};

exports.changeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
    const user = await User.findById(doctor.userId);
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${status}`,
      onClickPath: "/notifications",
    });
    user.isDoctor = status === "approved" ? true : false;
    await user.save();

    res.status(200).json({
      message: "Doctors status updated successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating status", success: false, error });
  }
};
