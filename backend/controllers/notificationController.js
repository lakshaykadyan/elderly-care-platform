const Notification = require("../models/Notification");

console.log("✅ Notification Controller Loaded");

// ================== GET NOTIFICATIONS ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called");

    // ✅ Check if user exists
    if (!req.user) {
      console.error("❌ [Backend] No user object in request");
      return res.status(401).json({
        message: "Unauthorized - No user found",
      });
    }

    const userId = req.user.id;
    console.log(`📢 [Backend] Fetching notifications for userId: ${userId}`);

    // ✅ Query notifications
    const notifications = await Notification.find({ userId: userId })
      .sort({ createdAt: -1 });

    console.log(`📢 [Backend] Found ${notifications.length} notifications`);

    res.status(200).json({
      notifications: notifications,
    });

  } catch (error) {
    console.error("❌ [Backend] CRITICAL ERROR in getNotifications:", error.message);
    console.error("❌ [Backend] Error stack:", error.stack);
    
    // ✅ Send a proper error response
    res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};

// ================== MARK AS READ ==================
const markAsRead = async (req, res) => {
  try {
    console.log(`📢 [Backend] markAsRead called for notification: ${req.params.id}`);

    if (!req.user) {
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
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json({
      message: "Notification marked as read",
      notification,
    });

  } catch (error) {
    console.error("❌ [Backend] Error in markAsRead:", error.message);
    res.status(500).json({
      message: "Failed to mark notification as read",
      error: error.message,
    });
  }
};

// ================== MARK ALL AS READ ==================
const markAllAsRead = async (req, res) => {
  try {
    if (!req.user) {
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
    console.error("❌ [Backend] Error in markAllAsRead:", error.message);
    res.status(500).json({
      message: "Failed to mark all notifications as read",
      error: error.message,
    });
  }
};

// ================== DELETE NOTIFICATION ==================
const deleteNotification = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json({
      message: "Notification deleted successfully",
    });

  } catch (error) {
    console.error("❌ [Backend] Error in deleteNotification:", error.message);
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