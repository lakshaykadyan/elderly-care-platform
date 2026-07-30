const Emergency = require("../models/Emergency");
const Notification = require("../models/Notification");
const User = require("../models/User");

// ================== SUBMIT EMERGENCY REQUEST ==================
const submitEmergency = async (req, res) => {
  try {
    const { name, email, phone, address, situation } = req.body;

    if (!name || !email || !phone || !address || !situation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emergency = await Emergency.create({
      name,
      email,
      phone,
      address,
      situation,
    });

    // ✅ Notify all admins + caregivers (emergency alert)
    try {
      const admins = await User.find({ role: "admin" });
      const caregivers = await User.find({ role: "caregiver" });

      const recipients = [...admins, ...caregivers];
      if (recipients.length > 0) {
        const notifications = recipients.map((user) => ({
          userId: user._id,
          message: `🚨 EMERGENCY: ${name} needs immediate help! Phone: ${phone}`,
          isRead: false,
        }));
        await Notification.insertMany(notifications);
      }
    } catch (notifError) {
      console.error("Failed to send emergency notification:", notifError);
    }

    res.status(201).json({
      message: "Emergency request submitted. We'll reach out immediately!",
      emergency,
    });
  } catch (error) {
    console.error("Emergency error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================== GET ALL EMERGENCY REQUESTS (ADMIN) ==================
const getEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ createdAt: -1 });
    res.json({ emergencies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== RESOLVE EMERGENCY (ADMIN) ==================
const resolveEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findByIdAndUpdate(
      req.params.id,
      { isResolved: true },
      { new: true }
    );
    if (!emergency) return res.status(404).json({ message: "Emergency not found" });
    res.json({ message: "Emergency marked as resolved", emergency });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitEmergency,
  getEmergencies,
  resolveEmergency,
};