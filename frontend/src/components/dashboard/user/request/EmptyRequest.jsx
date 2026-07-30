import { Calendar } from "lucide-react";

export default function EmptyRequest() {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px 20px",
      background: "rgba(79, 70, 229, 0.04)",
      borderRadius: "14px",
      border: "1px solid rgba(79, 70, 229, 0.06)",
      marginBottom: "28px",
      flexWrap: "wrap",
    }}>
      <div style={{
        fontSize: "32px",
        background: "rgba(79, 70, 229, 0.08)",
        padding: "8px 12px",
        borderRadius: "12px",
        border: "1px solid rgba(79, 70, 229, 0.04)",
        color: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Calendar size={32} />
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontSize: "16px",
          fontWeight: "600",
          color: "var(--text-primary)",
          margin: 0,
        }}>
          Book a Caregiver Service
        </h3>
        <p style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          margin: "4px 0 0 0",
          lineHeight: "1.5",
        }}>
          Fill the form below to request a verified caregiver. After submission, an available caregiver will be assigned to your booking.
        </p>
      </div>
    </div>
  );
}