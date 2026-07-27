const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Notification = require("../models/Notification");

console.log("✅ authController loaded. Notification model:", typeof Notification);

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

    // ============================================================
    // 🔥 DEBUGGING BLOCK - Check what's happening with notifications
    // ============================================================
    try {
      console.log("🔍 [DEBUG] Looking for admin users...");
      
      // ✅ 1. Check if Notification model exists
      if (!Notification) {
        console.error("❌ [DEBUG] Notification model is undefined or null!");
      } else {
        console.log("✅ [DEBUG] Notification model loaded successfully.");
      }

      // ✅ 2. Find all admin users
      const admins = await User.find({ role: "admin" });
      console.log(`🔍 [DEBUG] Found ${admins.length} admin(s).`);

      if (admins.length > 0) {
        // ✅ 3. Prepare notifications
        const notifications = admins.map((admin) => ({
          userId: admin._id,
          message: `New caregiver "${name}" registered and needs verification.`,
          isRead: false,
        }));

        console.log(`📝 [DEBUG] Preparing to insert ${notifications.length} notifications.`);

        // ✅ 4. Insert into database
        const result = await Notification.insertMany(notifications);
        console.log(`✅ [DEBUG] Successfully inserted ${result.length} notification(s).`);

      } else {
        console.warn("⚠️ [DEBUG] No admin users found. Notification NOT sent.");
      }

    } catch (notifError) {
      // ✅ 5. Catch any error and log it clearly
      console.error("❌ [DEBUG] NOTIFICATION ERROR:", notifError.message);
      console.error("❌ [DEBUG] Error Stack:", notifError.stack);
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