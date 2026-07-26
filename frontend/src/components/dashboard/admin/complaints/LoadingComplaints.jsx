export default function LoadingComplaints() {
  return (
    <div style={{
      textAlign: "center",
      padding: "60px 20px",
      background: "var(--bg-body)",
      borderRadius: "20px",
      border: "1px solid var(--border-color)",
    }}>
      <div style={{
        width: "48px",
        height: "48px",
        margin: "0 auto 16px",
        border: "4px solid var(--border-color)",
        borderTop: "4px solid #4f46e5",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }} />
      <h4 style={{ color: "var(--text-primary)", marginBottom: "4px" }}>Loading Complaints...</h4>
      <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Please wait...</p>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}