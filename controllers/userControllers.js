const User = require("./../models/userModel");
const Doctor = require("./../models/doctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        message: "You are already registered, please login",
        success: false,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(200).send({
      message: "Welcome back",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while creating user",
      success: false,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "User not found with this email",
        success: false,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(200).send({
        message: "Invalid credentials",
        success: false,
      });
    } else {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
      });
      res
        .status(200)
        .send({ message: "Login successful", success: true, token });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong !!",
      success: false,
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({ message: "User found", success: true, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong !!",
      success: false,
    });
  }
};

exports.applyDoctorAccount = async (req, res) => {
  try {
    const newDoctor = new Doctor({ ...req.body });
    await newDoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
      },
      onClickPath: "/admin/doctor-list",
    });
    await User.findByIdAndUpdate(adminUser._id, {unseenNotifications});

    res.status(200).send({
      message: "Doctor account applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while applying Doctor account",
      success: false,
    });
  }
};

exports.markAllNotificationsAsSeen = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId});
    const unseenNotifications = user.unseenNotifications;
    user.seenNotifications = [...user.seenNotifications, ...unseenNotifications];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    res.status(200).send({
      message: "All notifications marked as seen",
      success: true,
      updatedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while marking notifications as seen",
      success: false,
    });
  }
};

exports.deleteAllSeenNotifications = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.body.userId});
    user.seenNotifications = [];
    const updatedUser = await user.save();
    res.status(200).send({
      message: "All seen notifications deleted",
      success: true,
      updatedUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while deleting seen notifications",
      success: false,
    });
  }
};
