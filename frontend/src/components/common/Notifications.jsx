import { useState } from "react";
import NotificationHeader from "./notifications/NotificationHeader";
import NotificationList from "./notifications/NotificationList";
import { showSuccess } from "../../utils/toast";
import { Bell, DollarSign, Star } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: <Bell size={16} style={{ color: "var(--primary)" }} />,
      title: "New Admin Alert",
      message: "A new caregiver registration requires approval.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      icon: <DollarSign size={16} style={{ color: "#22c55e" }} />,
      title: "Payment Verification",
      message: "A payment of ₹5000 needs your verification.",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      icon: <Star size={16} style={{ color: "#f59e0b" }} />,
      title: "New Review",
      message: "A new review has been submitted for a caregiver.",
      time: "Yesterday",
      unread: false,
    },
  ]);

  const handleMarkAllRead = () => {
    showSuccess("All notifications marked as read");
  };

  return (
    <div className="profile-card">
      <NotificationHeader 
        title="Admin Notifications"
        subtitle="Manage all system alerts and updates"
        onMarkAllRead={handleMarkAllRead}
      />
      <NotificationList notifications={notifications} />
    </div>
  );
}