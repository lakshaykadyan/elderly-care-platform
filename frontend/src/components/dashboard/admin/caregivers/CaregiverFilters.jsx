import { Search } from "lucide-react";

export default function CaregiverFilters({
  search,
  setSearch,
  filter,
  setFilter,
  totalCaregivers,
}) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Verified", value: "verified" },
    { label: "Pending", value: "pending" },
  ];

  return (
    <>
      <style>{`
        [data-theme="dark"] .caregiver-search-input {
          color: #f8fafc !important;
          background: #0f172a !important;
          border-color: #334155 !important;
        }
        [data-theme="dark"] .caregiver-search-input::placeholder {
          color: #94a3b8 !important;
          opacity: 1 !important;
        }
        .caregiver-search-input {
          color: #0f172a !important;
          background: #f8fafc !important;
          border-color: #e2e8f0 !important;
        }
        .caregiver-search-input::placeholder {
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
        <div style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          minWidth: "280px",
          background: "var(--bg-body)",
          borderRadius: "12px",
          border: "1px solid var(--border-color)",
          padding: "0 12px",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#4f46e5"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            className="caregiver-search-input"
            type="text"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "12px 10px",
              border: "none",
              background: "transparent",
              color: "var(--text-primary)",
              fontSize: "15px",
              outline: "none",
            }}
          />
        </div>
        <div style={{
          background: "#4f46e5",
          color: "#fff",
          padding: "8px 18px",
          borderRadius: "12px",
          fontWeight: "600",
          fontSize: "14px",
        }}>
          Total : {totalCaregivers}
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