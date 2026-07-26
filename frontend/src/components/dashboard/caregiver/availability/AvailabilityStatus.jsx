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
          🟢 Available
        </button>
        <button 
          className={getBtnClass("busy")} 
          onClick={() => updateAvailability("busy")}
          disabled={availability === "offline"}
        >
          🟠 Busy
        </button>
        <button 
          className={getBtnClass("offline")} 
          onClick={() => updateAvailability("offline")}
        >
          🔴 Offline
        </button>
      </div>
    </>
  );
}