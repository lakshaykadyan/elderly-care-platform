require("dotenv").config();
const express = require("express");
// const cors = require("cors"); // ❌ Ab iski zaroorat nahi, hum manual headers bhej rahe hain
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const caregiverRoutes = require("./routes/caregiverRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const emergencyContactRoutes = require("./routes/emergencyContactRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

// Database connection
connectDB();

// Middleware to parse JSON (ZAROORI)
app.use(express.json());

// ===================== 🔥 FINAL CORS FIX (Manual Headers) =====================
// Ye 'cors' package ki jagah direct headers force karega. 100% Guarantee!
app.use((req, res, next) => {
  // Sirf tumhare Vercel frontend ko allow karo
  res.setHeader("Access-Control-Allow-Origin", "https://elderly-care-platform-chi.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  // Preflight (OPTIONS) request ko turant 200 OK bhejo
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
// =============================================================================

// ===================== ROUTES =====================
app.use("/api/auth", authRoutes);
app.use("/api/patient-profile", profileRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/caregiver", caregiverRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/emergency-contacts", emergencyContactRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});