import { User } from "lucide-react";

export default function EmptyProfile() {
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
        <User size={56} strokeWidth={1.5} />
      </div>
      <h3 style={{ color: "var(--text-primary)", marginBottom: "8px" }}>Profile Not Found</h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
        Please complete your profile by filling in the details above.
      </p>
    </div>
  );
}