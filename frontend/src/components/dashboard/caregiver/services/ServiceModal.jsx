import {
  Stethoscope,
  Mail,
  Phone,
  Home,
  Calendar,
  Clock,
  Hourglass,
  DollarSign,
  Star,
  FileText,
  X,
} from "lucide-react";

export default function ServiceModal({ service, badgeColor, onClose }) {
  if (!service) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      padding: "20px",
      animation: "modalFadeIn 0.25s ease",
    }}
    onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div style={{
        background: "var(--bg-card)",
        borderRadius: "24px",
        maxWidth: "700px",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "32px 28px",
        border: "1px solid var(--border-color)",
        boxShadow: "0 40px 80px -16px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "24px",
          gap: "16px",
        }}>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              <Stethoscope size={24} style={{ color: "var(--primary)" }} />
              Patient Details
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: "4px 0 0 0" }}>
              Complete Service Information
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "1px solid var(--border-color)",
              background: "transparent",
              color: "var(--text-primary)",
              fontSize: "20px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => { e.target.style.background = "rgba(239,68,68,0.1)"; e.target.style.borderColor = "#ef4444"; e.target.style.color = "#ef4444"; }}
            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "var(--border-color)"; e.target.style.color = "var(--text-primary)"; }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Profile + Status */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          background: "var(--bg-body)",
          borderRadius: "16px",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "20px",
              fontWeight: "700",
            }}>
              {service.userId?.name?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>
                {service.userId?.name || "Unknown"}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: "2px 0 0 0", display: "flex", alignItems: "center", gap: "4px" }}>
                <Mail size={14} /> {service.userId?.email || "No email"}
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "14px", margin: "0", display: "flex", alignItems: "center", gap: "4px" }}>
                <Phone size={14} /> {service.userId?.phone || "Not Available"}
              </p>
            </div>
          </div>
          <span style={{
            padding: "6px 18px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: "600",
            background: `${badgeColor(service.status)}15`,
            color: badgeColor(service.status),
            border: `1px solid ${badgeColor(service.status)}20`,
          }}>
            {service.status}
          </span>
        </div>

        {/* Details Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}>
          {[
            { label: "Service", value: service.serviceType, icon: <Home size={14} /> },
            { label: "Booking Date", value: service.bookingDate || "Not Set", icon: <Calendar size={14} /> },
            { label: "Booking Time", value: service.bookingTime || "Not Set", icon: <Clock size={14} /> },
            { label: "Duration", value: service.duration || "Not Set", icon: <Hourglass size={14} /> },
            { label: "Price", value: `₹ ${service.price || 0}`, icon: <DollarSign size={14} /> },
            { label: "Rating", value: `${service.rating || 0}/5`, icon: <Star size={14} /> },
          ].map((item, i) => (
            <div key={i} style={{
              padding: "14px 18px",
              background: "var(--bg-body)",
              borderRadius: "14px",
              border: "1px solid var(--border-color)",
            }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                {item.icon} {item.label}
              </span>
              <strong style={{ fontSize: "15px", color: "var(--text-primary)", display: "block", marginTop: "2px" }}>
                {item.value}
              </strong>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{
          padding: "16px 20px",
          background: "var(--bg-body)",
          borderRadius: "16px",
          marginBottom: "12px",
          borderLeft: "3px solid #4f46e5",
        }}>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
            <FileText size={14} /> Description
          </span>
          <p style={{ color: "var(--text-primary)", fontSize: "15px", lineHeight: "1.6", margin: "4px 0 0 0" }}>
            {service.description || "No description"}
          </p>
        </div>

        {/* Care Notes */}
        <div style={{
          padding: "16px 20px",
          background: "var(--bg-body)",
          borderRadius: "16px",
          marginBottom: "20px",
          borderLeft: "3px solid #22c55e",
        }}>
          <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px", textTransform: "uppercase", letterSpacing: "0.3px" }}>
            <FileText size={14} /> Care Notes
          </span>
          <p style={{ color: "var(--text-primary)", fontSize: "15px", lineHeight: "1.6", margin: "4px 0 0 0" }}>
            {service.careNotes || "No Care Notes Available"}
          </p>
        </div>

        {/* Footer */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          paddingTop: "16px",
          borderTop: "1px solid var(--border-color)",
        }}>
          <small style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            Requested: {new Date(service.createdAt).toLocaleString()}
          </small>
          <button
            onClick={onClose}
            style={{
              padding: "10px 32px",
              borderRadius: "30px",
              border: "none",
              background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
            }}
            onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)"; }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}