import { Bell } from "lucide-react";

export default function NotificationHeader({ 
  title = "Notifications", 
  subtitle = "View all your alerts and updates", 
  onMarkAllRead 
}) {
  return (
    <div className="notification-header">
      <div>
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Bell size={20} style={{ color: "var(--primary)" }} />
          {title}
        </h2>
        <p className="notification-subtitle">{subtitle}</p>
      </div>
      <button className="primary-btn" onClick={onMarkAllRead}>
        Mark All Read
      </button>
    </div>
  );
}