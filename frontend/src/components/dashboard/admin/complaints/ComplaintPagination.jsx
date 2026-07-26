export default function ComplaintPagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "16px",
      marginTop: "24px",
      flexWrap: "wrap",
    }}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        style={{
          padding: "10px 20px",
          borderRadius: "30px",
          border: "none",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          background: currentPage === 1 ? "var(--bg-body)" : "#4f46e5",
          color: currentPage === 1 ? "var(--text-muted)" : "#fff",
          fontWeight: "600",
          fontSize: "14px",
          transition: "all 0.3s ease",
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        ← Previous
      </button>

      <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>
        Page {currentPage} of {totalPages || 1}
      </span>

      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => setCurrentPage(currentPage + 1)}
        style={{
          padding: "10px 20px",
          borderRadius: "30px",
          border: "none",
          cursor: (currentPage === totalPages || totalPages === 0) ? "not-allowed" : "pointer",
          background: (currentPage === totalPages || totalPages === 0) ? "var(--bg-body)" : "#4f46e5",
          color: (currentPage === totalPages || totalPages === 0) ? "var(--text-muted)" : "#fff",
          fontWeight: "600",
          fontSize: "14px",
          transition: "all 0.3s ease",
          opacity: (currentPage === totalPages || totalPages === 0) ? 0.5 : 1,
        }}
      >
        Next →
      </button>
    </div>
  );
}