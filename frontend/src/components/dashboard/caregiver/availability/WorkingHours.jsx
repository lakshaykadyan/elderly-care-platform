import { Clock, Save } from "lucide-react";

export default function WorkingHours() {
  return (
    <>
      <hr style={{ margin: "35px 0", border: "none", borderTop: "1px solid var(--border-color)" }} />

      <div className="working-hours">
        <h3 style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}>
          <Clock size={20} style={{ color: "var(--primary)" }} />
          Working Hours
        </h3>

        {/* Grid for inputs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
          marginBottom: "20px",
        }}>
          <div>
            <label style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: "6px",
            }}>
              Start Time
            </label>
            <input
              type="time"
              defaultValue="09:00"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-body)",
                color: "var(--text-primary)",
                fontSize: "15px",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
              onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
            />
          </div>
          <div>
            <label style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "var(--text-secondary)",
              display: "block",
              marginBottom: "6px",
            }}>
              End Time
            </label>
            <input
              type="time"
              defaultValue="18:00"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid var(--border-color)",
                background: "var(--bg-body)",
                color: "var(--text-primary)",
                fontSize: "15px",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
              onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Button - Right aligned with flex */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            style={{
              padding: "12px 36px",
              borderRadius: "40px",
              border: "none",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.04)";
              e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)";
            }}
          >
            <Save size={18} />
            Save Working Hours
          </button>
        </div>
      </div>
    </>
  );
}