const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Notification = require("../models/Notification");

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
      password,
      role: "caregiver",
      caregiverProfile: {
        specialization,
        experience: Number(experience) || 0,
        serviceArea,
        availability: "available",
        verified: false,
      },
    });

    // ✅ Send notification to all admins (No Emoji)
    try {
      const admins = await User.find({ role: "admin" });
      if (admins.length > 0) {
        const notifications = admins.map((admin) => ({
          recipient: admin._id,
          message: `New caregiver "${name}" registered and needs verification.`,
          type: "caregiver_verification",
          relatedId: caregiver._id,
        }));
        await Notification.insertMany(notifications);
        console.log(`Notified ${admins.length} admin(s) about new caregiver.`);
      }
    } catch (notifError) {
      console.error("Failed to send caregiver notification:", notifError);
    }

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

    // ✅ Auto logout after 30 minutes
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
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