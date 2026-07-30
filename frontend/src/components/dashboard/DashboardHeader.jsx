import { Bell, Circle, Calendar, User } from "lucide-react";

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
          {greeting}, {userName} <Wave size={20} style={{ display: "inline" }} />
        </h1>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="header-right">
        <div className="notification-btn" title="Notifications">
          <Bell size={20} />
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
              <Circle size={12} color="#22c55e" style={{ display: "inline", marginRight: "4px" }} />
              Online
            </p>
          </div>
        </div>

        <div className="header-date">
          <Calendar size={16} style={{ display: "inline", marginRight: "4px" }} />
          {date}
        </div>
      </div>
    </div>
  );
}