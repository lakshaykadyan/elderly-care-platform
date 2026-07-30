import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  UserRound,
  Pill,
  Ambulance,
  Activity,
  Heart,
  X,
  Clock,
  Award,
  Users,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Home Nursing",
    desc: "Professional nursing care at home for elderly patients.",
    icon: Stethoscope,
    fullDesc: "Our certified nurses provide comprehensive medical care including wound dressing, catheter care, vital monitoring, and post-surgical support. Available 24/7 with flexible scheduling.",
    features: ["24/7 Availability", "Certified Nurses", "Post-Surgical Care", "Vital Monitoring"],
  },
  {
    id: 2,
    title: "Doctor Consultation",
    desc: "Book online consultations with experienced doctors.",
    icon: UserRound,
    fullDesc: "Connect with experienced doctors via video or phone consultation. Get prescriptions, medical advice, and follow-up care from the comfort of your home.",
    features: ["Video/Phone Consultation", "Prescription Services", "Follow-up Care", "Specialist Access"],
  },
  {
    id: 3,
    title: "Medicine Reminder",
    desc: "Smart reminders to never miss important medicines.",
    icon: Pill,
    fullDesc: "Never miss a dose with our smart medication reminder system. Get timely notifications, track adherence, and manage multiple medications effortlessly.",
    features: ["Smart Notifications", "Dose Tracking", "Multiple Medications", "Family Alerts"],
  },
  {
    id: 4,
    title: "Emergency Support",
    desc: "24×7 emergency response for critical situations.",
    icon: Ambulance,
    fullDesc: "Immediate emergency response with trained professionals. Panic button feature, GPS location sharing, and instant alert to family and emergency services.",
    features: ["Panic Button", "GPS Tracking", "Emergency Alerts", "24/7 Support"],
  },
  {
    id: 5,
    title: "Physiotherapy",
    desc: "Expert physiotherapy sessions at your doorstep.",
    icon: Activity,
    fullDesc: "Personalized physiotherapy sessions designed to improve mobility, reduce pain, and enhance quality of life. Our therapists come to your home with all equipment.",
    features: ["Home Visits", "Customized Plans", "Pain Management", "Mobility Improvement"],
  },
  {
    id: 6,
    title: "Personal Care",
    desc: "Daily assistance with hygiene and routine activities.",
    icon: Heart,
    fullDesc: "Compassionate caregivers assist with daily activities such as bathing, dressing, feeding, and mobility. Ensuring dignity and comfort for your loved ones.",
    features: ["Daily Hygiene Care", "Mobility Assistance", "Feeding Help", "Emotional Support"],
  },
];

export default function CareServices() {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const openModal = (service) => setSelectedService(service);
  const closeModal = () => setSelectedService(null);

  // Agar Learn More pe click karein toh modal khulega
  const handleLearnMore = (service) => {
    openModal(service);
  };

  return (
    <>
      <section className="services-section">
        <div className="container">
          <h2>Our Care Services</h2>
          <p>Everything seniors need for a healthy and comfortable lifestyle.</p>

          <div className="services-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div className="service-card" key={service.id}>
                  <div className="service-icon">
                    <Icon size={32} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <button
                    className="primary-btn"
                    onClick={() => handleLearnMore(service)}
                  >
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======== SERVICE DETAIL MODAL ======== */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <div className="modal-icon">
              {(() => {
                const Icon = selectedService.icon;
                return <Icon size={48} />;
              })()}
            </div>

            <h2>{selectedService.title}</h2>
            <p className="modal-full-desc">{selectedService.fullDesc}</p>

            <div className="modal-features">
              <h4>Key Features:</h4>
              <ul>
                {selectedService.features.map((feature, idx) => (
                  <li key={idx}>
                    <Award size={16} style={{ marginRight: "8px", display: "inline" }} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="primary-btn"
              onClick={() => {
                closeModal();
                navigate("/services");
              }}
            >
              Explore All Services
            </button>
          </div>
        </div>
      )}
    </>
  );
}