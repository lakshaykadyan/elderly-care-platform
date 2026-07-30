import { Phone, MapPin, Edit, Trash2 } from "lucide-react";

export default function ContactCard({ contact, handleEdit, handleDelete }) {
  return (
    <div style={{
      background: "var(--bg-body)",
      borderRadius: "16px",
      padding: "20px 24px",
      marginBottom: "16px",
      border: "1px solid var(--border-color)",
      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
      e.currentTarget.style.transform = "translateX(4px)";
      e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.06)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border-color)";
      e.currentTarget.style.transform = "translateX(0)";
      e.currentTarget.style.boxShadow = "none";
    }}>
      {/* Left: Avatar + Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
        <div style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          fontWeight: "700",
          color: "#fff",
          flexShrink: 0,
        }}>
          {contact.fullName?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 style={{
            fontSize: "17px",
            fontWeight: "600",
            color: "var(--text-primary)",
            margin: 0,
          }}>
            {contact.fullName}
          </h4>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
            <span style={{
              background: "rgba(99,102,241,0.08)",
              color: "#a78bfa",
              padding: "2px 12px",
              borderRadius: "30px",
              fontSize: "12px",
              fontWeight: "600",
              border: "1px solid rgba(99,102,241,0.06)",
            }}>
              {contact.relationship}
            </span>
            <span style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}>
              <Phone size={14} />
              {contact.phoneNumber}
            </span>
          </div>
          <p style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            margin: "6px 0 0 0",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
            <MapPin size={14} />
            {contact.address}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <a
          href={`tel:${contact.phoneNumber}`}
          style={{
            padding: "8px 18px",
            borderRadius: "30px",
            border: "none",
            background: "#22c55e",
            color: "#fff",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(34,197,94,0.2)",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 20px rgba(34,197,94,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 12px rgba(34,197,94,0.2)"; }}
        >
          <Phone size={14} />
          Call
        </a>
        <button
          onClick={() => handleEdit(contact)}
          style={{
            padding: "8px 18px",
            borderRadius: "30px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(79,70,229,0.2)",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 20px rgba(79,70,229,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 12px rgba(79,70,229,0.2)"; }}
        >
          <Edit size={14} />
          Edit
        </button>
        <button
          onClick={() => handleDelete(contact._id)}
          style={{
            padding: "8px 18px",
            borderRadius: "30px",
            border: "1px solid rgba(239,68,68,0.15)",
            background: "transparent",
            color: "#f87171",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => { e.target.style.background = "#ef4444"; e.target.style.color = "#fff"; e.target.style.borderColor = "#ef4444"; e.target.style.boxShadow = "0 4px 12px rgba(239,68,68,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#f87171"; e.target.style.borderColor = "rgba(239,68,68,0.15)"; e.target.style.boxShadow = "none"; }}
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}