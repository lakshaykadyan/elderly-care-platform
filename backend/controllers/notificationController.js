const Notification = require("../models/Notification");

console.log("✅ Notification Controller Loaded (Test Version)");

// ================== GET NOTIFICATIONS (TEST) ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called");
    console.log("📢 [Backend] User ID:", req.user?.id);

    // ✅ Return hardcoded test notification
    res.json({
      notifications: [
        {
          _id: "test123",
          userId: req.user?.id || "unknown",
          message: "✅ Test notification: Backend is working!",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ],
    });

  } catch (error) {
    console.error("❌ [Backend] Error:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== MARK AS READ ==================
const markAsRead = async (req, res) => {
  res.json({ message: "Mark as read called" });
};

// ================== MARK ALL AS READ ==================
const markAllAsRead = async (req, res) => {
  res.json({ message: "Mark all as read called" });
};

// ================== DELETE NOTIFICATION ==================
const deleteNotification = async (req, res) => {
  res.json({ message: "Delete notification called" });
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};