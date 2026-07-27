const Notification = require("../models/Notification");

console.log("✅ Notification Controller Loaded");

// ================== GET NOTIFICATIONS ==================
const getNotifications = async (req, res) => {
  try {
    console.log("📢 [Backend] getNotifications called for user:", req.user?.id);

    // ✅ Check if user is authenticated
    if (!req.user || !req.user.id) {
      console.error("❌ [Backend] User not authenticated");
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // ✅ Query notifications where userId matches the logged-in user
    const notifications = await Notification.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    console.log(`📢 [Backend] Found ${notifications.length} notifications`);

    res.json({
      notifications,
    });
  } catch (error) {
    console.error("❌ [Backend] Error in getNotifications:", error.message);
    console.error("❌ [Backend] Error stack:", error.stack);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== MARK AS READ ==================
const markAsRead = async (req, res) => {
  try {
    console.log("📢 [Backend] markAsRead called for notification:", req.params.id);

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
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
      message: error.message,
    });
  }
};

// ================== MARK ALL AS READ ==================
const markAllAsRead = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await Notification.updateMany(
      { userId: req.user.id, isRead: false },
      { isRead: true }
    );

    console.log(`📢 [Backend] Marked ${result.modifiedCount} notifications as read`);

    res.json({
      message: "All notifications marked as read",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ [Backend] Error in markAllAsRead:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== DELETE NOTIFICATION ==================
const deleteNotification = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized",
      });
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