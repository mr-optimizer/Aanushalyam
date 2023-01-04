const User = require("./../models/userModel");
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
