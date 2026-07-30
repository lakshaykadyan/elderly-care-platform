import { CheckCircle, Clock, Check } from "lucide-react";

export default function CaregiverRow({ caregiver, handleVerify }) {
  const isVerified = caregiver.caregiverProfile?.verified;

  return (
    <tr style={{
      borderBottom: "1px solid var(--border-color)",
      transition: "background 0.2s ease",
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-card)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
      <td style={{ padding: "12px 16px", fontWeight: "600", color: "var(--text-primary)" }}>
        {caregiver.name}
      </td>
      <td style={{ padding: "12px 16px", color: "var(--text-secondary)" }}>
        {caregiver.email}
      </td>
      <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>
        {caregiver.caregiverProfile?.specialization || "-"}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center", color: "var(--text-primary)" }}>
        {caregiver.caregiverProfile?.experience || 0} Years
      </td>
      <td style={{ padding: "12px 16px", color: "var(--text-primary)" }}>
        {caregiver.caregiverProfile?.serviceArea || "-"}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {isVerified ? (
          <span style={{ color: "#22c55e", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <CheckCircle size={14} /> Verified
          </span>
        ) : (
          <span style={{ color: "#f59e0b", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Clock size={14} /> Pending
          </span>
        )}
      </td>
      <td style={{ padding: "12px 16px", textAlign: "center" }}>
        {isVerified ? (
          <span style={{
            background: "rgba(34,197,94,0.1)",
            color: "#22c55e",
            padding: "4px 14px",
            borderRadius: "30px",
            fontSize: "12px",
            fontWeight: "600",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}>
            <Check size={14} /> Approved
          </span>
        ) : (
          <button
            onClick={() => handleVerify(caregiver._id)}
            style={{
              padding: "6px 18px",
              borderRadius: "30px",
              border: "none",
              background: "#22c55e",
              color: "#fff",
              fontWeight: "600",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            Verify
          </button>
        )}
      </td>
    </tr>
  );
}