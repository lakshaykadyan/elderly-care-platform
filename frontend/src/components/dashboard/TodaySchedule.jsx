import { Calendar, User, Stethoscope, MapPin } from "lucide-react";

export default function TodaySchedule() {
  const schedule = [
    {
      time: "09:00 AM",
      patient: "Rajesh Kumar",
      service: "Health Checkup",
      location: "Sector 14, Gurgaon",
      status: "start",
    },
    {
      time: "11:30 AM",
      patient: "Sunita Devi",
      service: "Medicine Support",
      location: "Model Town",
      status: "navigate",
    },
    {
      time: "02:00 PM",
      patient: "Amit Sharma",
      service: "Home Visit",
      location: "Delhi Road",
      status: "details",
    },
    {
      time: "05:00 PM",
      patient: "Anjali Verma",
      service: "Follow-up",
      location: "Rohini",
      status: "completed",
    },
  ];

  return (
    <div className="today-schedule">
      <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Calendar size={20} /> Today's Schedule
      </h2>

      {schedule.map((item, index) => (
        <div className="schedule-item" key={index}>
          <div className="schedule-time">
            <span className="timeline-dot"></span>
            <h3>{item.time}</h3>
          </div>

          <div className="schedule-info">
            <h4 style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <User size={14} /> {item.patient}
            </h4>
            <p style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Stethoscope size={14} /> {item.service}
            </p>
            <span className="schedule-location" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={14} /> {item.location}
            </span>
          </div>

          <div className="schedule-action">
            {item.status === "start" && (
              <button className="schedule-btn start">Start Visit</button>
            )}
            {item.status === "navigate" && (
              <button className="schedule-btn navigate">Navigate</button>
            )}
            {item.status === "details" && (
              <button className="schedule-btn details">View Details</button>
            )}
            {item.status === "completed" && (
              <button className="schedule-btn completed">Completed</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}