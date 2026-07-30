import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

export default function WeeklyAvailability({ onToggle }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // State for each day
  const [schedule, setSchedule] = useState(
    days.reduce((acc, day) => ({ ...acc, [day]: true }), {})
  );

  // Track previous today status to prevent duplicate calls
  const prevTodayOffRef = useRef(false);

  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Get today's status
  const isTodayOff = !schedule[today];

  // Notify parent ONLY when today's status actually changes
  useEffect(() => {
    if (prevTodayOffRef.current !== isTodayOff) {
      prevTodayOffRef.current = isTodayOff;
      if (onToggle) {
        onToggle(isTodayOff);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTodayOff]);

  // Toggle handler
  const toggleDay = (day) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <>
      <hr style={{ margin: "30px 0", border: "none", borderTop: "1px solid var(--border-color)" }} />
      <h3 style={{
        fontSize: "18px",
        fontWeight: "600",
        color: "var(--text-primary)",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}>
        <Calendar size={20} style={{ color: "var(--primary)" }} />
        Weekly Availability
      </h3>
      <div className="weekly-grid">
        {days.map((day) => (
          <div
            key={day}
            className="day-card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 18px",
              background: "var(--bg-body)",
              borderRadius: "14px",
              border: "1px solid var(--border-color)",
            }}
          >
            <span style={{
              color: "var(--text-primary)",
              fontWeight: day === today ? "700" : "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              {day} {day === today && <MapPin size={16} style={{ color: "var(--primary)" }} />}
            </span>

            <label
              className="switch"
              style={{
                position: "relative",
                display: "inline-block",
                width: "48px",
                height: "24px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={schedule[day]}
                onChange={() => toggleDay(day)}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "30px",
                  background: schedule[day]
                    ? "var(--success, #4CAF50)"
                    : "var(--border-color, #ccc)",
                  transition: "all 0.3s ease",
                  boxShadow: schedule[day]
                    ? "0 0 8px rgba(76, 175, 80, 0.3)"
                    : "none",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: schedule[day] ? "26px" : "2px",
                    bottom: "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
              </span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}