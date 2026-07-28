const Service = require("../models/Service");
const User = require("../models/User");
const Notification = require("../models/Notification");
const { addMonths, addYears, differenceInHours, parseISO, isValid } = require("date-fns");

// ===== EXACT CALENDAR DURATION CALCULATOR =====
const calculateExactHours = (startDate, value, unit) => {
  if (!startDate) throw new Error("Start date required");
  const start = typeof startDate === "string" ? parseISO(startDate) : startDate;
  if (!isValid(start)) throw new Error("Invalid start date");
  const num = parseInt(value) || 0;
  let end = new Date(start);
  switch (unit) {
    case "hours": return num;
    case "days": return num * 24;
    case "weeks": return num * 168;
    case "months":
      end = addMonths(start, num);
      return Math.round(differenceInHours(end, start));
    case "years":
      end = addYears(start, num);
      return Math.round(differenceInHours(end, start));
    default:
      return num * 24;
  }
};

// ===== PRICING CONFIG (same as before) =====
const SERVICE_CONFIG = {
  "Home Nursing": { fixedCharge: 600, dailyRate: 1000 },
  "Elderly Attendant": { fixedCharge: 500, dailyRate: 800 },
  "Physiotherapy": { fixedCharge: 700, dailyRate: 1200 },
  "Post Hospital Care": { fixedCharge: 800, dailyRate: 1500 },
};

const calculateServicePrice = (serviceType, hours) => {
  const safeHours = Math.max(0, parseFloat(hours) || 0);
  const config = SERVICE_CONFIG[serviceType];
  if (!config) {
    const defaultDaily = 800;
    if (safeHours <= 4) return 500;
    if (safeHours < 24) return Math.round(500 + (safeHours - 4) * (800/24 * 1.3));
    return Math.round(defaultDaily * (safeHours / 24));
  }
  const { fixedCharge, dailyRate } = config;
  const hourlyRate = dailyRate / 24;
  if (safeHours <= 4) return fixedCharge;
  if (safeHours < 24) {
    const extra = safeHours - 4;
    return Math.round(fixedCharge + extra * hourlyRate * 1.3);
  }
  const days = safeHours / 24;
  const weeks = days / 7;
  const months = days / 30;
  if (days < 7) return Math.round(dailyRate * days);
  if (weeks >= 1 && weeks < 4) {
    let total = weeks * dailyRate * 7 * 0.9;
    if (weeks >= 2) total *= (1 - Math.min((Math.floor(weeks) - 1) * 0.03, 0.15));
    return Math.round(total);
  }
  if (months >= 1 && months < 12) {
    let total = months * dailyRate * 30 * 0.8;
    if (months >= 2) total *= (1 - Math.min((Math.floor(months) - 1) * 0.02, 0.35));
    if (months >= 6 && months < 7) return Math.round(dailyRate * 30 * 6 * 0.75);
    return Math.round(total);
  }
  if (months >= 12) {
    return Math.round(dailyRate * 30 * months * 0.7);
  }
  return Math.round(dailyRate * days);
};

// ================== CREATE SERVICE ==================
const createService = async (req, res) => {
  try {
    const { serviceType, description, bookingDate, bookingTime, duration, durationUnit } = req.body;
    if (!serviceType || !description || !bookingDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const hours = calculateExactHours(bookingDate, duration || 1, durationUnit || "hours");
    const price = calculateServicePrice(serviceType, hours);
    const service = await Service.create({
      userId: req.user.id,
      serviceType,
      description,
      bookingDate,
      bookingTime,
      duration: hours,
      durationValue: duration || 1,
      durationUnit: durationUnit || "hours",
      price,
    });
    // Notify admins
    try {
      const admins = await User.find({ role: "admin" });
      if (admins.length) {
        const notifications = admins.map(admin => ({
          userId: admin._id,
          message: `New service "${serviceType}" from ${req.user.name}. Price: ₹${price}`,
          isRead: false,
        }));
        await Notification.insertMany(notifications);
      }
    } catch (e) { console.error(e); }
    res.status(201).json({ message: "Service created", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ================== GET USER SERVICES ==================
const getUserServices = async (req, res) => {
  try {
    const services = await Service.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ services });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== UPDATE SERVICE ==================
const updateService = async (req, res) => {
  try {
    const { serviceType, description, status, duration, durationUnit, bookingDate, bookingTime } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    service.serviceType = serviceType || service.serviceType;
    service.description = description || service.description;
    service.bookingDate = bookingDate || service.bookingDate;
    service.bookingTime = bookingTime || service.bookingTime;

    if (duration !== undefined || durationUnit !== undefined) {
      const newDuration = duration ?? service.durationValue;
      const newUnit = durationUnit ?? service.durationUnit;
      const startDate = service.bookingDate;
      const exactHours = calculateExactHours(startDate, newDuration, newUnit);
      service.duration = exactHours;
      service.durationValue = newDuration;
      service.durationUnit = newUnit;
      service.price = calculateServicePrice(service.serviceType, exactHours);
    } else if (serviceType) {
      service.price = calculateServicePrice(service.serviceType, service.duration);
    }

    const allowed = ["pending","accepted","in-progress","completed","rejected"];
    if (status && !allowed.includes(status)) return res.status(400).json({ message: "Invalid status" });
    service.status = status || service.status;
    await service.save();
    res.json({ message: "Service updated", service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ================== DELETE SERVICE ==================
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================== SUBMIT REVIEW ==================
const submitServiceReview = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.userId.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });
    if (service.status !== "completed") return res.status(400).json({ message: "Only completed services can be reviewed" });
    if (rating < 1 || rating > 5) return res.status(400).json({ message: "Rating between 1-5" });
    service.rating = rating;
    service.review = review;
    await service.save();
    if (service.caregiverId) {
      const caregiverServices = await Service.find({ caregiverId: service.caregiverId, rating: { $gt: 0 } });
      const total = caregiverServices.reduce((sum, s) => sum + s.rating, 0);
      const avg = caregiverServices.length ? total / caregiverServices.length : 0;
      await User.findByIdAndUpdate(service.caregiverId, {
        "caregiverProfile.rating": Number(avg.toFixed(1)),
        "caregiverProfile.totalReviews": caregiverServices.length,
      });
    }
    res.json({ message: "Review submitted", service });
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