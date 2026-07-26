const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================== SIGNUP ==================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      password, 
    });

    res.status(201).json({
      message: "User saved in DB Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== CAREGIVER SIGNUP ==================
const caregiverSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      serviceArea,
    } = req.body;

    if (!name || !email || !password || !specialization || !serviceArea) {
      return res.status(400).json({
        message: "All caregiver fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Caregiver already exists",
      });
    }

    const caregiver = await User.create({
      name,
      email,
      password, // Raw password
      role: "caregiver",
      caregiverProfile: {
        specialization,
        experience: Number(experience) || 0,
        serviceArea,
        availability: "available",
        verified: false,
      },
    });

    res.status(201).json({
      message: "Caregiver registered successfully",
      caregiver: {
        _id: caregiver._id,
        name: caregiver.name,
        email: caregiver.email,
        role: caregiver.role,
        caregiverProfile: caregiver.caregiverProfile,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== LOGIN ==================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    if (user.isActive === false) {
      return res.status(403).json({
        message: "Your account has been disabled by admin",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  caregiverSignup,
  login,
};