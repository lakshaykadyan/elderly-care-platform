const services = [
  {
    title: "Home Nursing",
    desc: "Professional nursing care at home for elderly patients.",
    icon: "🩺",
  },
  {
    title: "Doctor Consultation",
    desc: "Book online consultations with experienced doctors.",
    icon: "👨‍⚕️",
  },
  {
    title: "Medicine Reminder",
    desc: "Smart reminders to never miss important medicines.",
    icon: "💊",
  },
  {
    title: "Emergency Support",
    desc: "24×7 emergency response for critical situations.",
    icon: "🚑",
  },
  {
    title: "Physiotherapy",
    desc: "Expert physiotherapy sessions at your doorstep.",
    icon: "🏃",
  },
  {
    title: "Personal Care",
    desc: "Daily assistance with hygiene and routine activities.",
    icon: "❤️",
  },
];

export default function CareServices() {
  return (
    <section className="services-section">
      <div className="container">
        <h2>Our Care Services</h2>
        <p>
          Everything seniors need for a healthy and comfortable lifestyle.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>

              <h3>{service.title}</h3>

              <p>{service.desc}</p>

              <button className="primary-btn">Learn More</button> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}