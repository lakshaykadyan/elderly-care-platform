export default function MedicalRecordCard({ record, handleDelete }) {
  const type = (record.fileType || "N/A").toUpperCase();

  return (
    <div style={{
      background: "var(--bg-body)",
      borderRadius: "16px",
      padding: "20px 24px",
      marginBottom: "16px",
      border: "1px solid var(--border-color)",
      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "16px",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
      e.currentTarget.style.transform = "translateX(4px)";
      e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "var(--border-color)";
      e.currentTarget.style.transform = "translateX(0)";
      e.currentTarget.style.boxShadow = "none";
    }}>
      {/* Left Section: Icon + Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "14px",
          background: "rgba(79,70,229,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          border: "1px solid rgba(79,70,229,0.06)",
          flexShrink: 0,
        }}>
          📄
        </div>
        <div>
          <h4 style={{
            fontSize: "17px",
            fontWeight: "600",
            color: "var(--text-primary)",
            margin: 0,
          }}>
            {record.title}
          </h4>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px", flexWrap: "wrap" }}>
            <span style={{
              background: "rgba(99,102,241,0.08)",
              color: "#a78bfa",
              padding: "2px 12px",
              borderRadius: "30px",
              fontSize: "12px",
              fontWeight: "600",
              border: "1px solid rgba(99,102,241,0.06)",
            }}>
              {type}
            </span>
            <span style={{
              color: "var(--text-muted)",
              fontSize: "13px",
            }}>
              📅 {new Date(record.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <a
          href={record.fileUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "8px 18px",
            borderRadius: "30px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: "600",
            fontSize: "13px",
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            boxShadow: "0 4px 12px rgba(79,70,229,0.2)",
          }}
          onMouseEnter={(e) => { e.target.style.transform = "scale(1.04)"; e.target.style.boxShadow = "0 8px 20px rgba(79,70,229,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 12px rgba(79,70,229,0.2)"; }}
        >
          👁 View
        </a>
        <button
          onClick={() => handleDelete(record._id)}
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
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => { e.target.style.background = "#ef4444"; e.target.style.color = "#fff"; e.target.style.borderColor = "#ef4444"; e.target.style.boxShadow = "0 4px 12px rgba(239,68,68,0.3)"; }}
          onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.color = "#f87171"; e.target.style.borderColor = "rgba(239,68,68,0.15)"; e.target.style.boxShadow = "none"; }}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}