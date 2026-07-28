const Service = require("../models/Service");
const User = require("../models/User");
const Notification = require("../models/Notification");

// ===================== SERVICE PRICING CONFIG =====================
const SERVICE_CONFIG = {
  "Home Nursing": {
    fixedCharge: 600,
    dailyRate: 1000,
  },
  "Elderly Attendant": {
    fixedCharge: 500,
    dailyRate: 800,
  },
  "Physiotherapy": {
    fixedCharge: 700,
    dailyRate: 1200,
  },
  "Post Hospital Care": {
    fixedCharge: 800,
    dailyRate: 1500,
  },
};

// ===================== PRICING ENGINE (SAFE VERSION) =====================
const calculateServicePrice = (serviceType, hours) => {
  // ✅ Safety Check: Ensure hours is a valid number
  const safeHours = Math.max(0, parseFloat(hours) || 0);
  
  const config = SERVICE_CONFIG[serviceType];
  if (!config) {
    console.warn(`⚠️ Unknown service type: ${serviceType}, using default pricing`);
    // Fallback default pricing (800 per day)
    const defaultDaily = 800;
    if (safeHours <= 4) return 500; // default minimum
    if (safeHours < 24) return Math.round(500 + (safeHours - 4) * (800/24 * 1.3));
    return Math.round(defaultDaily * (safeHours / 24));
  }

  const { fixedCharge, dailyRate } = config;
  const hourlyRate = dailyRate / 24;

  // 🟢 1-4 Hours → Fixed Charge
  if (safeHours <= 4) {
    return fixedCharge;
  }

  // 🟢 4-24 Hours → Fixed + 30% per extra hour
  if (safeHours < 24) {
    const extraHours = safeHours - 4;
    const extraRate = hourlyRate * 1.30;
    return Math.round(fixedCharge + extraHours * extraRate);
  }

  const days = safeHours / 24;
  const weeks = days / 7;
  const months = days / 30;

  // 🟢 1 to 6 Days → Daily Rate × Days
  if (days < 7) {
    return Math.round(dailyRate * days);
  }

  // 🟢 Weekly (1 Week to 3 Weeks)
  if (weeks >= 1 && weeks < 4) {
    let weeklyDiscount = 0.10;
    let weeklyRate = dailyRate * 7 * (1 - weeklyDiscount);
    let total = weeks * weeklyRate;

    if (weeks >= 2) {
      const extraWeeks = Math.floor(weeks) - 1;
      const extraDiscount = Math.min(extraWeeks * 0.03, 0.15);
      total = total * (1 - extraDiscount);
    }
    return Math.round(total);
  }

  // 🟢 Monthly (1 to 11 Months)
  if (months >= 1 && months < 12) {
    let monthlyDiscount = 0.20;
    let monthlyRate = dailyRate * 30 * (1 - monthlyDiscount);
    let total = months * monthlyRate;

    if (months >= 2) {
      const extraMonths = Math.floor(months) - 1;
      const extraDiscount = Math.min(extraMonths * 0.02, 0.35);
      total = total * (1 - extraDiscount);
    }

    if (months >= 6 && months < 7) {
      return Math.round(dailyRate * 30 * 6 * 0.75);
    }
    return Math.round(total);
  }

  // 🟢 Yearly (12+ Months) → 30% off
  if (months >= 12) {
    const yearlyRate = dailyRate * 30 * 0.70;
    return Math.round(yearlyRate * months);
  }

  return Math.round(dailyRate * days);
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

    const hours = parseInt(duration) || 0;
    const price = calculateServicePrice(serviceType, hours);

    const service = await Service.create({
      userId: req.user.id,
      serviceType,
      description,
      bookingDate,
      bookingTime,
      duration,
      price,
    });

    try {
      const admins = await User.find({ role: "admin" });
      if (admins.length > 0) {
        const notifications = admins.map((admin) => ({
          userId: admin._id,
          message: `New service request "${serviceType}" from ${req.user.name || "User"}. Price: ₹${price}`,
          isRead: false,
        }));
        await Notification.insertMany(notifications);
        console.log(`📢 Notified ${admins.length} admin(s) about new service.`);
      }
    } catch (notifError) {
      console.error("❌ Failed to send service notification:", notifError);
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

// ================== UPDATE SERVICE (SAFE VERSION) ==================
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

    service.serviceType = serviceType || service.serviceType;
    service.description = description || service.description;

    // 🔥 FIXED: Safely parse duration before calculating price
    if (duration !== undefined && duration !== null && duration !== "") {
      const parsedDuration = parseInt(duration) || 0;
      service.duration = parsedDuration;
      service.price = calculateServicePrice(service.serviceType, parsedDuration);
    } else if (serviceType) {
      // Agar sirf serviceType change ho raha hai, toh existing duration use karo
      const existingDuration = parseInt(service.duration) || 0;
      service.price = calculateServicePrice(serviceType, existingDuration);
    }

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
    console.error("❌ Update Service Error:", error.message);
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