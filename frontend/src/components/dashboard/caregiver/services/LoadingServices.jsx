export default function LoadingServices() {
  return (
    <div style={{
      textAlign: "center",
      padding: "60px 20px",
      background: "var(--bg-card)",
      borderRadius: "20px",
      border: "1px solid var(--border-color)",
    }}>
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
      <h4 style={{ color: "var(--text-primary)", marginBottom: "4px" }}>Loading Assigned Services...</h4>
      <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Please wait...</p>
    </div>
  );
}