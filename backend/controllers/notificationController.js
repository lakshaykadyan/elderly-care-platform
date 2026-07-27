const Notification = require("../models/Notification");

console.log("✅ Notification Controller Loaded");

// ================== GET NOTIFICATIONS ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called");

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    console.log(`📢 Found ${notifications.length} notifications`);

    res.json({ notifications });
  } catch (error) {
    console.error("❌ getNotifications error:", error.message);
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
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
    console.error("❌ markAsRead error:", error.message);
    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// ================== MARK ALL AS READ ==================
const markAllAsRead = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { isRead: true }
    );

    res.json({
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ markAllAsRead error:", error.message);
    res.status(500).json({
      message: "Failed to mark all notifications as read",
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
    console.error("❌ deleteNotification error:", error.message);
    res.status(500).json({
      message: "Failed to delete notification",
      error: error.message,
    });
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};