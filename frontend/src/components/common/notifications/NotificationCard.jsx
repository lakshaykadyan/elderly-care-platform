export default function NotificationCard({ notification }) {
  return (
    <div className={`notification-card ${notification.unread ? "unread" : ""}`}>
      <div className="notification-left">
        <div className="notification-icon">{notification.icon}</div>
        <div className="notification-content">
          <h3>{notification.title}</h3>
          <p>{notification.message}</p>
          <small>{notification.time}</small>
        </div>
      </div>
      <button className="delete-btn">✕</button>
    </div>
  );
}