export default function DashboardCard({ icon, title, value, color }) {
  return (
    <div className="dashboard-card">
      <div className="card-icon" style={{ background: color || "#4f46e5" }}>
        {icon}
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <h1>{value}</h1>
      </div>
    </div>
  );
}