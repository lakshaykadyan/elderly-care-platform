const User = require("../models/User");
const Service = require("../models/Service");
const Notification = require("../models/Notification");

const getAssignedServices = async (req, res) => {
  try {
    const services = await Service.find({
      caregiverId: req.user.id,
    })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      message: "Assigned services fetched successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const allowedAvailability = ["available", "busy", "offline"];

    if (!allowedAvailability.includes(availability)) {
      return res.status(400).json({
        message: "Invalid availability status",
      });
    }

    const caregiver = await User.findById(req.user.id);

    if (!caregiver) {
      return res.status(404).json({
        message: "Caregiver not found",
      });
    }

    caregiver.caregiverProfile.availability = availability;
    await caregiver.save();

    console.log("Saved Availability:", caregiver.caregiverProfile.availability);

    res.json({
      message: "Availability updated successfully",
      availability: caregiver.caregiverProfile.availability,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCaregiverServiceStatus = async (req, res) => {
  try {
    const { status, careNotes } = req.body;

    const allowedStatuses = [
      "accepted",
      "in-progress",
      "completed",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid caregiver status",
      });
    }

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    if (!service.caregiverId || service.caregiverId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized caregiver",
      });
    }

    service.status = status;

    if (careNotes) {
      service.careNotes = careNotes;
    }

    await service.save();

    // ✅ NEW: Notify user about EVERY status update
    try {
      const statusMessages = {
        accepted: "has been accepted by your caregiver 🟢",
        "in-progress": "is now in progress 🔄",
        completed: "has been completed successfully ✅",
        rejected: "has been rejected by the caregiver ❌",
      };
      await Notification.create({
        userId: service.userId,
        message: `Your service "${service.serviceType}" ${statusMessages[status] || `is now "${status}"`}.`,
      });
      console.log(`📢 Notified user ${service.userId} about status: ${status}`);
    } catch (notifError) {
      console.error("❌ Failed to send user notification:", notifError.message);
    }

    // ✅ Keep old notifications for specific statuses (but now redundant, still safe)
    if (status === "completed") {
      await Notification.create({
        userId: service.userId,
        message: "Your service has been completed successfully.",
      });
    }

    if (status === "rejected") {
      await Notification.create({
        userId: service.userId,
        message: "Your assigned caregiver rejected the service request.",
      });
    }

    res.json({
      message: "Service updated by caregiver successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== GET CAREGIVER PROFILE ==================

const getAvailability = async (req, res) => {
  try {
    const caregiver = await User.findById(req.user.id);

    if (!caregiver) {
      return res.status(404).json({
        message: "Caregiver not found",
      });
    }

    console.log("Fetched Availability:", caregiver.caregiverProfile.availability);

    res.json({
      availability: caregiver.caregiverProfile.availability,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== CAREGIVER DASHBOARD STATS ==================

const getDashboardStats = async (req, res) => {
  try {
    const services = await Service.find({
      caregiverId: req.user.id,
    });

    const completed = services.filter((s) => s.status === "completed").length;
    const working = services.filter((s) => s.status === "in-progress").length;
    const accepted = services.filter((s) => s.status === "accepted").length;
    const total = services.length;

    const earnings = services
      .filter((s) => s.status === "completed")
      .reduce((sum, item) => sum + (item.price || 0), 0);

    const ratingServices = services.filter((s) => s.rating > 0);

    const averageRating =
      ratingServices.length > 0
        ? (
            ratingServices.reduce((sum, item) => sum + item.rating, 0) /
            ratingServices.length
          ).toFixed(1)
        : 0;

    res.json({
      total,
      completed,
      working,
      accepted,
      earnings,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== GET CAREGIVER PROFILE ==================

const getCaregiverProfile = async (req, res) => {
  try {
    const caregiver = await User.findById(req.user.id).select("-password");

    if (!caregiver) {
      return res.status(404).json({
        message: "Caregiver not found",
      });
    }

    res.json({
      message: "Caregiver profile fetched successfully",
      caregiver,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================== UPDATE CAREGIVER PROFILE ==================

const updateCaregiverProfile = async (req, res) => {
  try {
    const {
      specialization,
      experience,
      qualification,
      phone,
      gender,
      age,
      address,
      bio,
      serviceArea,
    } = req.body;

    const caregiver = await User.findById(req.user.id);

    if (!caregiver) {
      return res.status(404).json({
        message: "Caregiver not found",
      });
    }

    caregiver.caregiverProfile.specialization =
      specialization ?? caregiver.caregiverProfile.specialization;

    caregiver.caregiverProfile.experience =
      experience ?? caregiver.caregiverProfile.experience;

    caregiver.caregiverProfile.qualification =
      qualification ?? caregiver.caregiverProfile.qualification;

    caregiver.caregiverProfile.phone =
      phone ?? caregiver.caregiverProfile.phone;

    caregiver.caregiverProfile.gender =
      gender ?? caregiver.caregiverProfile.gender;

    caregiver.caregiverProfile.age =
      age ?? caregiver.caregiverProfile.age;

    caregiver.caregiverProfile.address =
      address ?? caregiver.caregiverProfile.address;

    caregiver.caregiverProfile.bio =
      bio ?? caregiver.caregiverProfile.bio;

    caregiver.caregiverProfile.serviceArea =
      serviceArea ?? caregiver.caregiverProfile.serviceArea;

    await caregiver.save();

    res.json({
      message: "Profile updated successfully",
      caregiver,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAssignedServices,
  updateAvailability,
  updateCaregiverServiceStatus,
  getAvailability,
  getCaregiverProfile,
  updateCaregiverProfile,
  getDashboardStats,
};