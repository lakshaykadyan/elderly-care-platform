export default function ComplaintFilters({
  search,
  setSearch,
  filter,
  setFilter,
  totalComplaints,
}) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Resolved", value: "resolved" },
  ];

  return (
    <>
      <style>{`
        [data-theme="dark"] .complaint-search-input {
          color: #f8fafc !important;
          background: #0f172a !important;
          border-color: #334155 !important;
        }
        [data-theme="dark"] .complaint-search-input::placeholder {
          color: #94a3b8 !important;
          opacity: 1 !important;
        }
        .complaint-search-input {
          color: #0f172a !important;
          background: #f8fafc !important;
          border-color: #e2e8f0 !important;
        }
        .complaint-search-input::placeholder {
          color: #94a3b8 !important;
          opacity: 1 !important;
        }
      `}</style>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "15px",
        marginBottom: "20px",
      }}>
        <input
          className="complaint-search-input"
          type="text"
          placeholder="🔍 Search User or Subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            minWidth: "280px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
            fontSize: "15px",
            outline: "none",
            transition: "all 0.3s ease",
          }}
          onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
          onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
        />
        <div style={{
          background: "#4f46e5",
          color: "#fff",
          padding: "8px 18px",
          borderRadius: "12px",
          fontWeight: "600",
          fontSize: "14px",
        }}>
          Total : {totalComplaints}
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "24px",
      }}>
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            style={{
              padding: "8px 18px",
              borderRadius: "30px",
              border: "1px solid var(--border-color)",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "13px",
              transition: "all 0.3s ease",
              background: filter === item.value ? "#4f46e5" : "var(--bg-body)",
              color: filter === item.value ? "#fff" : "var(--text-secondary)",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}