import { AlertTriangle } from "lucide-react";

export default function EmptyComplaints() {
  return (
    <div style={{
      textAlign: "center",
      padding: "60px 20px",
      background: "var(--bg-body)",
      borderRadius: "20px",
      border: "2px dashed var(--border-color)",
    }}>
      <div style={{
        fontSize: "56px",
        marginBottom: "16px",
        color: "var(--text-muted)",
        display: "flex",
        justifyContent: "center",
      }}>
        <AlertTriangle size={56} strokeWidth={1.5} style={{ color: "#f59e0b" }} />
      </div>
      <h3 style={{ color: "var(--text-primary)", marginBottom: "8px" }}>No Complaints Found</h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
        There are no complaints available.
      </p>
    </div>
  );
}