const User = require("../models/User");
const Service = require("../models/Service");
const Complaint = require("../models/Complaint");
const Notification = require("../models/Notification");

// ================== ADMIN: GET ALL SERVICES ==================
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("userId", "name email")
      .populate("caregiverId", "name email caregiverProfile")
      .sort({ createdAt: -1 });

    res.json({
      message: "All services fetched for admin Successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: UPDATE SERVICE STATUS ==================
const updateServiceStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "accepted",
      "in-progress",
      "completed",
      "rejected",
    ];

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    service.status = status;
    await service.save();

    try {
      await Notification.create({
        userId: service.userId,
        message: `Your service request is now "${status}".`,
      });
    } catch (notificationError) {
      console.log("Status notification error:", notificationError.message);
    }

    res.json({
      message: "Service status updated by admin Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: VERIFY CAREGIVER ==================
const verifyCaregiver = async (req, res) => {
  try {
    const caregiver = await User.findById(req.params.id);

    if (!caregiver) {
      return res.status(404).json({ message: "Caregiver not found" });
    }

    if (caregiver.role !== "caregiver") {
      return res.status(400).json({
        message: "Selected user is not a caregiver",
      });
    }

    caregiver.caregiverProfile.verified = true;
    await caregiver.save();

    try {
      await Notification.create({
        userId: caregiver._id,
        message: "🎉 Congratulations! Your caregiver profile has been verified by Admin.",
      });
    } catch (error) {
      console.log("Caregiver notification:", error.message);
    }

    res.json({
      message: "Caregiver verified successfully",
      caregiver,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: ASSIGN CAREGIVER ==================
const assignCaregiver = async (req, res) => {
  try {
    const { caregiverId } = req.body;

    if (!caregiverId) {
      return res.status(400).json({
        message: "Caregiver ID is required",
      });
    }

    const service = await Service.findById(req.params.serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.caregiverId) {
      return res.status(400).json({
        message: "Caregiver already assigned",
      });
    }

    const caregiver = await User.findById(caregiverId);

    if (!caregiver || caregiver.role !== "caregiver") {
      return res.status(404).json({
        message: "Valid caregiver not found",
      });
    }

    if (!caregiver.caregiverProfile.verified) {
      return res.status(400).json({
        message: "Caregiver is not verified",
      });
    }

    service.caregiverId = caregiverId;
    service.status = "accepted";
    await service.save();

    // ✅ Notification to USER
    try {
      await Notification.create({
        userId: service.userId,
        message: `A caregiver has been assigned to your service request.`,
      });
    } catch (notificationError) {
      console.log("User notification error:", notificationError.message);
    }

    // ✅ NEW: Notification to CAREGIVER
    try {
      await Notification.create({
        userId: caregiverId,
        message: `You have been assigned to a new service "${service.serviceType}" by Admin.`,
      });
      console.log(`📢 Notified caregiver ${caregiverId} about assignment.`);
    } catch (notifError) {
      console.error("❌ Failed to send caregiver notification:", notifError.message);
    }

    res.json({
      message: "Caregiver assigned successfully",
      service,
    });
  } catch (error) {
    console.log("ASSIGN CAREGIVER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: GET ALL CAREGIVERS ==================
const getAllCaregivers = async (req, res) => {
  try {
    const caregivers = await User.find({ role: "caregiver" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      message: "Caregivers fetched successfully",
      caregivers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: GET COMPLAINTS ==================
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("userId", "name email")
      .populate("serviceId", "serviceType status")
      .sort({ createdAt: -1 });

    res.json({
      message: "Complaints fetched successfully",
      complaints,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: RESOLVE COMPLAINT ==================
const updateComplaint = async (req, res) => {
  try {
    const { status, adminReply } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    if (status) complaint.status = status;
    if (adminReply) complaint.adminReply = adminReply;

    await complaint.save();

    if (complaint.userId) {
      try {
        await Notification.create({
          userId: complaint.userId,
          message: `Admin replied to your complaint: "${complaint.subject}"`,
        });
      } catch (notificationError) {
        console.log("Complaint notification error:", notificationError.message);
      }
    }

    res.json({
      message: "Complaint updated successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: GET ALL USERS ==================
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;

    const filter = role && role !== "All" ? { role } : {};

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: TOGGLE USER STATUS ==================
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admin account cannot be disabled",
      });
    }

    user.isActive = user.isActive === false ? true : false;
    await user.save();

    res.json({
      message: user.isActive ? "User enabled successfully" : "User disabled successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN: DELETE USER ==================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "Admin account cannot be deleted",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== ADMIN DASHBOARD ==================

const getDashboardStats = async (req, res) => {
  try {
    console.log("===== DASHBOARD API CALLED =====");
    console.log("Logged User:", req.user);

    const totalUsers = await User.countDocuments({ role: "user" });
    const totalCaregivers = await User.countDocuments({ role: "caregiver" });
    const totalServices = await Service.countDocuments();
    const totalComplaints = await Complaint.countDocuments();

    console.log({
      totalUsers,
      totalCaregivers,
      totalServices,
      totalComplaints,
    });

    res.json({
      totalUsers,
      totalCaregivers,
      totalServices,
      totalComplaints,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// ================== ADMIN ANALYTICS ==================

const getAnalytics = async (req, res) => {
  console.log("===== ANALYTICS API CALLED =====");
  console.log("Logged User:", req.user);

  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalCaregivers = await User.countDocuments({ role: "caregiver" });
    const totalServices = await Service.countDocuments();
    const completedServices = await Service.countDocuments({ status: "completed" });
    const pendingServices = await Service.countDocuments({ status: "pending" });
    const totalComplaints = await Complaint.countDocuments();
    const acceptedServices = await Service.countDocuments({ status: "accepted" });
    const inProgressServices = await Service.countDocuments({ status: "in-progress" });
    const rejectedServices = await Service.countDocuments({ status: "rejected" });
    const verifiedCaregivers = await User.countDocuments({
      role: "caregiver",
      "caregiverProfile.verified": true,
    });
    const activeUsers = await User.countDocuments({
      role: "user",
      isActive: true,
    });
    const activeCaregivers = await User.countDocuments({
      role: "caregiver",
      isActive: true,
    });

    console.log({
      totalUsers,
      totalCaregivers,
      activeUsers,
      activeCaregivers,
      verifiedCaregivers,
      totalServices,
      completedServices,
      pendingServices,
      acceptedServices,
      inProgressServices,
      rejectedServices,
      totalComplaints,
    });

    res.json({
      totalUsers,
      totalCaregivers,
      activeUsers,
      activeCaregivers,
      verifiedCaregivers,
      totalServices,
      completedServices,
      pendingServices,
      acceptedServices,
      inProgressServices,
      rejectedServices,
      totalComplaints,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllServices,
  updateServiceStatus,
  verifyCaregiver,
  assignCaregiver,
  getComplaints,
  updateComplaint,
  getAllCaregivers,
  getAllUsers,
  toggleUserStatus,
  deleteUser,
  getAnalytics,
  getDashboardStats,
};