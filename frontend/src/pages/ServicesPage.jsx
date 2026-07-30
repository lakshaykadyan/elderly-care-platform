import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import BackButton from "../components/common/BackButton";
import {
  Stethoscope,
  UserRound,
  Pill,
  Ambulance,
  Activity,
  Heart,
  X,
  Award,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

const allServices = [
  {
    id: 1,
    title: "Home Nursing",
    desc: "Professional nursing care at home for elderly patients.",
    icon: Stethoscope,
    color: "#4f46e5",
    price: "₹600/4hrs | ₹1000/day",
    benefits: "24/7 care, certified nurses, post-surgical support, vital monitoring",
    features: ["24/7 Availability", "Certified Nurses", "Post-Surgical Care", "Vital Monitoring", "Wound Dressing", "Catheter Care"],
  },
  {
    id: 2,
    title: "Doctor Consultation",
    desc: "Book online consultations with experienced doctors.",
    icon: UserRound,
    color: "#8b5cf6",
    price: "₹500/consultation",
    benefits: "Video/phone consultation, prescription services, specialist access",
    features: ["Video/Phone Consultation", "Prescription Services", "Follow-up Care", "Specialist Access", "Medical Advice", "Online Reports"],
  },
  {
    id: 3,
    title: "Medicine Reminder",
    desc: "Smart reminders to never miss important medicines.",
    icon: Pill,
    color: "#f59e0b",
    price: "₹200/month",
    benefits: "Smart notifications, dose tracking, family alerts",
    features: ["Smart Notifications", "Dose Tracking", "Multiple Medications", "Family Alerts", "Schedule Management", "Adherence Reports"],
  },
  {
    id: 4,
    title: "Emergency Support",
    desc: "24×7 emergency response for critical situations.",
    icon: Ambulance,
    color: "#ef4444",
    price: "₹1,000/response",
    benefits: "Panic button, GPS tracking, instant emergency alerts",
    features: ["Panic Button", "GPS Tracking", "Emergency Alerts", "24/7 Support", "Ambulance Coordination", "Family Notification"],
  },
  {
    id: 5,
    title: "Physiotherapy",
    desc: "Expert physiotherapy sessions at your doorstep.",
    icon: Activity,
    color: "#22c55e",
    price: "₹700/session | ₹1,200/day",
    benefits: "Home visits, customized plans, pain management",
    features: ["Home Visits", "Customized Plans", "Pain Management", "Mobility Improvement", "Rehab Exercises", "Progress Tracking"],
  },
  {
    id: 6,
    title: "Personal Care",
    desc: "Daily assistance with hygiene and routine activities.",
    icon: Heart,
    color: "#ec4899",
    price: "₹500/4hrs | ₹800/day",
    benefits: "Daily hygiene care, mobility assistance, emotional support",
    features: ["Daily Hygiene Care", "Mobility Assistance", "Feeding Help", "Emotional Support", "Companionship", "Medication Assistance"],
  },
];

export default function ServicesPage() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (service) => setSelectedService(service);
  const closeModal = () => setSelectedService(null);

  return (
    <>
      <Navbar />
      <main className="services-page" style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <BackButton />

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "700", color: "var(--text-primary)" }}>
            All Services
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "600px", margin: "8px auto 0" }}>
            Explore all the services we offer to make elderly care easier and more reliable.
          </p>
        </div>

        <div className="services-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
        }}>
          {allServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                style={{
                  background: "var(--bg-card)",
                  padding: "28px 24px",
                  borderRadius: "20px",
                  border: "1px solid var(--border-color)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
                  e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "var(--border-color)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: `${service.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: service.color,
                  }}>
                    <Icon size={28} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-primary)", margin: 0 }}>
                    {service.title}
                  </h3>
                </div>

                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", flex: 1 }}>
                  {service.desc}
                </p>

                {/* ✅ NEW Price Design – Clean Tag Style */}
                <div style={{ marginTop: "12px" }}>
                  <span style={{
                    display: "inline-block",
                    padding: "4px 14px",
                    borderRadius: "20px",
                    background: `${service.color}15`,
                    color: service.color,
                    fontSize: "13px",
                    fontWeight: "600",
                    border: `1px solid ${service.color}20`,
                  }}>
                    <DollarSign size={14} style={{ display: "inline", marginRight: "4px" }} />
                    {service.price}
                  </span>
                </div>

                <button
                  className="primary-btn"
                  onClick={() => openModal(service)}
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  Learn More
                </button>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />

      {/* ====== SERVICE DETAIL MODAL ====== */}
      {selectedService && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          padding: "20px",
        }} onClick={closeModal}>
          <div style={{
            background: "var(--bg-card)",
            borderRadius: "24px",
            maxWidth: "600px",
            width: "100%",
            padding: "40px 32px",
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
            animation: "fadeSlideIn 0.3s ease",
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <X size={24} />
            </button>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: `${selectedService.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: selectedService.color,
              }}>
                {(() => {
                  const Icon = selectedService.icon;
                  return <Icon size={32} />;
                })()}
              </div>
              <h2 style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
                {selectedService.title}
              </h2>
            </div>

            <div style={{
              display: "inline-block",
              padding: "4px 16px",
              borderRadius: "20px",
              background: `${selectedService.color}15`,
              color: selectedService.color,
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "16px",
              border: `1px solid ${selectedService.color}20`,
            }}>
              <DollarSign size={16} style={{ display: "inline", marginRight: "4px" }} />
              {selectedService.price}
            </div>

            <p style={{ fontSize: "16px", lineHeight: "1.7", color: "var(--text-secondary)", marginBottom: "20px" }}>
              {selectedService.desc}
            </p>

            <div style={{
              background: "var(--bg-body)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "16px",
            }}>
              <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", margin: "0 0 8px 0" }}>
                <ShieldCheck size={16} style={{ display: "inline", marginRight: "6px" }} />
                Benefits
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>
                {selectedService.benefits}
              </p>
            </div>

            <div style={{
              background: "var(--bg-body)",
              borderRadius: "16px",
              padding: "20px",
            }}>
              <h4 style={{ fontSize: "15px", fontWeight: "600", color: "var(--text-primary)", margin: "0 0 12px 0" }}>
                <Award size={16} style={{ display: "inline", marginRight: "6px" }} />
                Key Features
              </h4>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "6px 16px",
              }}>
                {selectedService.features.map((feature, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    padding: "4px 0",
                  }}>
                    <span style={{ color: selectedService.color }}>✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                closeModal();
                navigate("/services");
              }}
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              Explore More Services
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 992px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .services-page h1 {
            font-size: 28px !important;
          }
        }
      `}</style>
    </>
  );
}