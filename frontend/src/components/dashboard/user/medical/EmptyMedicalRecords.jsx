export default function EmptyMedicalRecords() {
  return (
    <div style={{
      textAlign: "center",
      padding: "60px 20px",
      background: "var(--bg-body)",
      borderRadius: "20px",
      border: "2px dashed var(--border-color)",
    }}>
      <div style={{ fontSize: "56px", marginBottom: "16px" }}>📂</div>
      <h3 style={{ color: "var(--text-primary)", marginBottom: "8px" }}>No Medical Records</h3>
      <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
        Upload your first medical record to keep everything organized.
      </p>
    </div>
  );
}