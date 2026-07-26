export default function DashboardCard({
  icon,
  title,
  value,
  color = "#4f6df5",
}) {
  return (
    <div
       className="dashboard-card"
       title={title}
    >
      <div
        className="card-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="card-content">

        <h3>{title}</h3>

        <h1>

          {typeof value === "number"
            ? value.toLocaleString("en-IN")
            : value}

        </h1>

        <p>
          {new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

      </div>

    </div>
  );
}