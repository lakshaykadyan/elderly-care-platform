import { LogOut } from "lucide-react";

export default function ConfirmLogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        {/* Icon replaced with LogOut from lucide-react */}
        <div className="logout-icon">
          <LogOut size={48} strokeWidth={1.5} />
        </div>
        <h2>Logout</h2>
        <p>Are you sure you want to logout?</p>
        <div className="logout-actions">
          {/* Cancel Button - Visible in both modes */}
          <button
            onClick={onCancel}
            style={{
              padding: "12px 28px",
              borderRadius: "10px",
              border: "1px solid #e2e8f0",
              background: "#f1f5f9",
              color: "#1e293b",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e2e8f0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f1f5f9")}
          >
            Cancel
          </button>

          {/* Yes, Logout Button - Red always visible */}
          <button
            onClick={onConfirm}
            style={{
              padding: "12px 28px",
              borderRadius: "10px",
              border: "none",
              background: "#ef4444",
              color: "#ffffff",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.3s ease, transform 0.2s ease",
              boxShadow: "0 4px 14px rgba(239, 68, 68, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#dc2626";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#ef4444";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}