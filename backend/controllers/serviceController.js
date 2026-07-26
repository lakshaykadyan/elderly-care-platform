const Service = require("../models/Service");
const User = require("../models/User");

const getServicePrice = (serviceType) => {
  if (serviceType === "Home Nursing") return 1200;
  if (serviceType === "Elderly Attendant") return 800;
  if (serviceType === "Physiotherapy") return 1000;
  if (serviceType === "Post Hospital Care") return 1500;
  return 0;
};

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

    const service = await Service.create({
      userId: req.user.id,
      serviceType,
      description,
      bookingDate,
      bookingTime,
      duration,
      price: getServicePrice(serviceType),
    });

    res.status(201).json({
      message: "Service request created Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const updateService = async (req, res) => {
  try {
    const { serviceType, description, status } = req.body;

    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    service.serviceType = serviceType || service.serviceType;
    service.description = description || service.description;
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

    if (serviceType) {
      service.price = getServicePrice(serviceType);
    }

    await service.save();

    res.json({
      message: "Service updated Successfully",
      service,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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