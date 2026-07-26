export default function AnalyticsSummary({ stats }) {
  const successRate = stats.totalServices > 0
    ? ((stats.completedServices / stats.totalServices) * 100).toFixed(1)
    : 0;

  const items = [
    { icon: "🏆", title: "Success Rate", value: `${successRate}%`, color: "#f59e0b" },
    { icon: "👥", title: "Active Users", value: stats.activeUsers, color: "#4f46e5" },
    { icon: "🧑‍⚕️", title: "Verified Caregivers", value: stats.verifiedCaregivers, color: "#22c55e" },
    { icon: "📅", title: "Total Services", value: stats.totalServices, color: "#8b5cf6" },
  ];

  return (
    <div style={{
      background: "var(--bg-card)",
      padding: "24px 28px",
      borderRadius: "20px",
      border: "1px solid var(--border-color)",
    }}>
      <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "16px" }}>
        📈 Quick Summary
      </h3>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
      }}>
        {items.map((item, i) => (
          <div key={i} style={{
            padding: "16px 20px",
            background: "var(--bg-body)",
            borderRadius: "14px",
            border: "1px solid var(--border-color)",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.transform = "translateY(0)";
          }}>
            <div style={{ fontSize: "28px", marginBottom: "4px" }}>{item.icon}</div>
            <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-muted)", display: "block" }}>{item.title}</span>
            <h4 style={{ fontSize: "24px", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>{item.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}