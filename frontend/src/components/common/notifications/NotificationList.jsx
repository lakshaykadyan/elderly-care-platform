import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

export default function NotificationList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return <EmptyNotifications />;
  }
  return (
    <div className="notification-list">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id || notification._id} notification={notification} />
      ))}
    </div>
  );
}