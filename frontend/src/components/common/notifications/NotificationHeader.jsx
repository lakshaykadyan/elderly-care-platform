export default function NotificationHeader({ title = "🔔 Notifications", subtitle = "View all your alerts and updates", onMarkAllRead }) {
  return (
    <div className="notification-header">
      <div>
        <h2>{title}</h2>
        <p className="notification-subtitle">{subtitle}</p>
      </div>
      <button className="primary-btn" onClick={onMarkAllRead}>
        Mark All Read
      </button>
    </div>
  );
}