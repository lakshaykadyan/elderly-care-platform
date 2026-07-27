// ✅ No model import needed - pure hardcoded response
console.log("✅ Notification Controller Loaded (Pure Hardcoded Mode)");

// ================== GET NOTIFICATIONS ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called");
    console.log("📢 User ID:", req.user?.id);

    // ✅ Pure hardcoded response - no database query
    return res.status(200).json({
      notifications: [
        {
          _id: "hardcoded_1",
          userId: req.user?.id || "unknown",
          message: "✅ This is a test notification. Backend is working!",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          _id: "hardcoded_2",
          userId: req.user?.id || "unknown",
          message: "🔔 Caregiver verification pending for John Doe.",
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ],
    });

  } catch (error) {
    console.error("❌ [Backend] CRITICAL ERROR:", error.message);
    console.error("❌ Stack:", error.stack);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ================== MARK AS READ ==================
const markAsRead = async (req, res) => {
  console.log("📢 markAsRead called");
  return res.json({ message: "Marked as read (hardcoded)" });
};

// ================== MARK ALL AS READ ==================
const markAllAsRead = async (req, res) => {
  console.log("📢 markAllAsRead called");
  return res.json({ message: "All marked as read (hardcoded)" });
};

// ================== DELETE NOTIFICATION ==================
const deleteNotification = async (req, res) => {
  console.log("📢 deleteNotification called");
  return res.json({ message: "Deleted (hardcoded)" });
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};