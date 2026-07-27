const Service = require("../models/Service");
const User = require("../models/User");
const Notification = require("../models/Notification"); // ✅ Ensure imported

// ================== DYNAMIC PRICING ==================
const getServicePrice = (serviceType, duration = 0) => {
  // Base rates per hour
  const rates = {
    "Home Nursing": 100,
    "Elderly Attendant": 80,
    "Physiotherapy": 120,
    "Post Hospital Care": 150,
  };

  const baseRate = rates[serviceType] || 0;
  if (baseRate === 0) return 0;

  // Extract hours from duration string (e.g., "2 Hours" -> 2)
  const hours = parseInt(duration);
  if (isNaN(hours) || hours <= 0) return baseRate * 1; // Default 1 hour

  let price = baseRate * hours;

  // ✅ Extra 30% for each hour beyond 2 hours
  if (hours > 2) {
    const extraHours = hours - 2;
    price += extraHours * baseRate * 0.3;
  }

  return Math.round(price);
};

// ================== CREATE SERVICE ==================
const createService = async (req, res) => {
  try {
    const { serviceType, description, bookingDate, bookingTime, duration } =
      req.body;

    if (!serviceType || !description) {
      return res.status(400).json({
        message: "Service type and description are required",
      });
    }

    if (bookingDate) {
      const today = new Date();
      const selected = new Date(bookingDate);
      if (selected < today) {
        return res.status(400).json({
          message: "Booking date cannot be in the past",
        });
      }
    }

    // ✅ Price auto-calculated based on service type and duration
    const price = getServicePrice(serviceType, duration);

    const service = await Service.create({
      userId: req.user.id,
      serviceType,
      description,
      bookingDate,
      bookingTime,
      duration,
      price,
    });

    // ✅ Send notification to all admins
    try {
      const admins = await User.find({ role: "admin" });
      if (admins.length > 0) {
        const notifications = admins.map((admin) => ({
          recipient: admin._id,
          message: `📋 New service request "${serviceType}" from ${req.user.name || "User"}.`,
          type: "new_service",
          relatedId: service._id,
        }));
        await Notification.insertMany(notifications);
        console.log(`📢 Notified ${admins.length} admin(s) about new service.`);
      }
    } catch (notifError) {
      console.error("Failed to send service notification:", notifError);
    }

    res.status(201).json({
      message: "Service request created Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== GET USER SERVICES ==================
const getUserServices = async (req, res) => {
  try {
    const services = await Service.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      message: "User services fetched Successfully",
      services,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== UPDATE SERVICE ==================
const updateService = async (req, res) => {
  try {
    const { serviceType, description, status, duration } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update fields
    service.serviceType = serviceType || service.serviceType;
    service.description = description || service.description;

    // ✅ If duration changes, recalculate price (User cannot manually edit price)
    if (duration !== undefined) {
      service.duration = duration;
      service.price = getServicePrice(service.serviceType, duration);
    } else if (serviceType) {
      // If only service type changes, recalculate price with existing duration
      service.price = getServicePrice(service.serviceType, service.duration);
    }

    // Status update (if provided)
    const allowedStatus = [
      "pending",
      "accepted",
      "in-progress",
      "completed",
      "rejected",
    ];
    if (status && !allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid Status",
      });
    }
    service.status = status || service.status;

    await service.save();

    res.json({
      message: "Service updated Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== DELETE SERVICE ==================
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.json({
      message: "Service deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== SUBMIT REVIEW ==================
const submitServiceReview = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (service.status !== "completed") {
      return res.status(400).json({
        message: "Only completed services can be reviewed",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    service.rating = rating;
    service.review = review;

    await service.save();

    if (service.caregiverId) {
      const caregiverServices = await Service.find({
        caregiverId: service.caregiverId,
        rating: { $gt: 0 },
      });

      const totalRating = caregiverServices.reduce(
        (sum, item) => sum + item.rating,
        0
      );

      const averageRating =
        caregiverServices.length > 0
          ? totalRating / caregiverServices.length
          : 0;

      await User.findByIdAndUpdate(service.caregiverId, {
        "caregiverProfile.rating": Number(averageRating.toFixed(1)),
        "caregiverProfile.totalReviews": caregiverServices.length,
      });
    }

    res.json({
      message: "Review submitted successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createService,
  getUserServices,
  updateService,
  deleteService,
  submitServiceReview,
};