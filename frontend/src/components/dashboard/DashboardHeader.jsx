export default function DashboardHeader({
  title,
  subtitle,
  userName = "Caregiver",
  notificationCount = 0,
}) {
  const now = new Date();

  const hour = now.getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const date = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="dashboard-header">

      <div className="header-left">

        <h1>
          {greeting}, {userName} 👋
        </h1>

        <h2>{title}</h2>

        <p>{subtitle}</p>

      </div>

      <div className="header-right">

        <div
          className="notification-btn"
          title="Notifications"
        >
          🔔

          {notificationCount > 0 && (
            <span className="notification-dot">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}

        </div>

        <div className="profile-box">

          <div className="profile-avatar">

            {userName?.charAt(0)?.toUpperCase() || "C"}

          </div>

          <div>

            <strong>{userName}</strong>

            <p className="online-status">
              🟢 Online
            </p>

          </div>

        </div>

        <div className="header-date">

          <span>📅 {date}</span>

        </div>

      </div>

    </div>
  );
}