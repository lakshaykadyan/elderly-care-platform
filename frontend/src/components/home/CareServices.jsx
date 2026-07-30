import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Activity,
  Heart,
  ArrowRight,
} from "lucide-react";

// ✅ Sirf 3 services for Home Page
const homeServices = [
  {
    id: 1,
    title: "Home Nursing",
    desc: "Professional nursing care at home for elderly patients.",
    icon: Stethoscope,
    color: "#4f46e5",
  },
  {
    id: 2,
    title: "Physiotherapy",
    desc: "Expert physiotherapy sessions at your doorstep.",
    icon: Activity,
    color: "#22c55e",
  },
  {
    id: 3,
    title: "Personal Care",
    desc: "Daily assistance with hygiene and routine activities.",
    icon: Heart,
    color: "#ef4444",
  },
];

export default function CareServices() {
  const navigate = useNavigate();

  return (
    <section className="services-section">
      <div className="container">
        <h2>Our Care Services</h2>
        <p>Everything seniors need for a healthy and comfortable lifestyle.</p>

        <div className="services-grid">
          {homeServices.map((service) => {
            const Icon = service.icon;
            return (
              <div className="service-card" key={service.id}>
                <div className="service-icon" style={{ color: service.color }}>
                  <Icon size={32} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button
                  className="primary-btn"
                  onClick={() => navigate("/services")}
                >
                  Learn More <ArrowRight size={18} style={{ marginLeft: "6px", display: "inline" }} />
                </button>
              </div>
            );
          })}
        </div>

        {/* ✅ View All Services Button */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <button
            className="secondary-btn"
            onClick={() => navigate("/services")}
            style={{
              padding: "12px 36px",
              borderRadius: "40px",
              border: "2px solid var(--primary)",
              background: "transparent",
              color: "var(--primary)",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--primary)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--primary)";
            }}
          >
            View All Services →
          </button>
        </div>
      </div>
    </section>
  );
}