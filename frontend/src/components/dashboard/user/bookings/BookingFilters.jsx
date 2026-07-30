import { Search } from "lucide-react";

export default function BookingFilters({
  search,
  setSearch,
  filter,
  setFilter,
  totalBookings,
}) {
  const filters = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Accepted", value: "accepted" },
    { label: "In Progress", value: "in-progress" },
    { label: "Completed", value: "completed" },
    { label: "Rejected", value: "rejected" },
  ];

  return (
    <>
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
          borderRadius: "10px",
          border: "1px solid var(--border-color)",
          padding: "0 12px",
          transition: "all 0.3s ease",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#4f46e5"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; e.currentTarget.style.boxShadow = "none"; }}
        >
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search Service..."
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
          background: "#5867dd",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "10px",
          fontWeight: "600",
        }}>
          Total : {totalBookings}
        </div>
      </div>

      <div style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}>
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            style={{
              padding: "10px 18px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              background: filter === item.value ? "#5867dd" : "var(--bg-body)",
              color: filter === item.value ? "#fff" : "var(--text-secondary)",
              border: filter === item.value ? "none" : "1px solid var(--border-color)",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}