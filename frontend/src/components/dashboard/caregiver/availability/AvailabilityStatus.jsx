import { Circle } from "lucide-react";

export default function AvailabilityStatus({ availability, updateAvailability }) {
  const getBtnClass = (status) => {
    if (availability === status) return `status-btn active-${status}`;
    return `status-btn inactive-${status}`;
  };

  return (
    <>
      <div style={{ marginBottom: "8px" }}>
        <span style={{ color: "var(--text-muted)", fontSize: "15px" }}>
          Current Status:{' '}
          <strong style={{
            color: availability === "available" ? "#4ade80" :
                   availability === "busy" ? "#fbbf24" :
                   "#f87171",
            textTransform: "capitalize",
          }}>
            {availability}
          </strong>
        </span>
      </div>
      <div className="status-buttons">
        <button 
          className={getBtnClass("available")} 
          onClick={() => updateAvailability("available")}
          disabled={availability === "offline"}
        >
          <Circle size={16} color="#22c55e" style={{ display: "inline", marginRight: "6px" }} />
          Available
        </button>
        <button 
          className={getBtnClass("busy")} 
          onClick={() => updateAvailability("busy")}
          disabled={availability === "offline"}
        >
          <Circle size={16} color="#f59e0b" style={{ display: "inline", marginRight: "6px" }} />
          Busy
        </button>
        <button 
          className={getBtnClass("offline")} 
          onClick={() => updateAvailability("offline")}
        >
          <Circle size={16} color="#ef4444" style={{ display: "inline", marginRight: "6px" }} />
          Offline
        </button>
      </div>
    </>
  );
}