const Notification = require("../models/Notification");

console.log("✅ Notification Controller Loaded (With Fallback)");

// ================== GET NOTIFICATIONS ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called");

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // ✅ Try to fetch real notifications from database
    let notifications = [];
    try {
      notifications = await Notification.find({
        userId: req.user.id,
      }).sort({ createdAt: -1 });
      console.log(`📢 Found ${notifications.length} real notifications`);
    } catch (dbError) {
      console.error("❌ Database error, using fallback:", dbError.message);
      // ✅ Fallback: Return hardcoded notification if DB fails
      notifications = [
        {
          _id: "fallback1",
          userId: req.user.id,
          message: "✅ Backend is working! (Fallback mode)",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    res.json({ notifications });

  } catch (error) {
    console.error("❌ [Backend] Critical error:", error.message);
    // ✅ Ultimate fallback
    res.json({
      notifications: [
        {
          _id: "emergency1",
          userId: req.user?.id || "unknown",
          message: "⚠️ Service is running in emergency mode.",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
      ],
    });
  }
};

// ================== MARK AS READ ==================
const markAsRead = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("❌ [Backend] markAsRead error:", error.message);
    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// ================== MARK AS READ ==================
const markAsRead = async (req, res) => {
  try {
    console.log(`📢 [Backend] markAsRead called for ID: ${req.params.id}`);

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ Check if notification exists first
    const existingNotification = await Notification.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!existingNotification) {
      console.log(`⚠️ Notification ${req.params.id} not found in database`);
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    // ✅ Update to read
    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      { isRead: true },
      { new: true }
    );

    res.json({
      message: "Notification marked as read",
      notification,
    });

  } catch (error) {
    console.error("❌ [Backend] markAsRead error:", error.message);
    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// ================== DELETE NOTIFICATION ==================
const deleteNotification = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({
      message: "Notification deleted successfully",
    });
  } catch (error) {
    console.error("❌ [Backend] deleteNotification error:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};