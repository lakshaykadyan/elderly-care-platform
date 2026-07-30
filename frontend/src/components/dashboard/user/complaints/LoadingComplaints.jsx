import { Loader } from "lucide-react";

export default function LoadingComplaints() {
  return (
    <div style={{
      textAlign: "center",
      padding: "40px 20px",
      background: "var(--bg-body)",
      borderRadius: "16px",
      border: "1px solid var(--border-color)",
    }}>
      <div style={{
        fontSize: "32px",
        marginBottom: "12px",
        color: "var(--primary)",
        display: "flex",
        justifyContent: "center",
      }}>
        <Loader size={32} className="spin" />
      </div>
      <h4 style={{ color: "var(--text-primary)", marginBottom: "4px" }}>Loading Complaints...</h4>
      <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Please wait...</p>
    </div>
  );
}