import NotificationPanel from "../common/NotificationPanel";
import ProfileDropdown from "../common/profile/ProfileDropdown";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";

export default function Topbar() {
  const { user } = useAuth();
  const { toggleSidebar } = useSidebar();

  const userName = user?.name || user?.fullName || "Guest";

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* ✅ Hamburger Button for Mobile */}
        <button
          onClick={toggleSidebar}
          style={{
            display: "none", // Mobile pe visible hoga
            background: "none",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
            color: "var(--text-primary)",
            marginRight: "12px",
            padding: "4px",
          }}
          className="hamburger-menu-btn"
        >
          ☰
        </button>
        <h2>Welcome 👋 {userName}</h2>
      </div>
      <div className="topbar-right">
        <NotificationPanel />
        <ProfileDropdown />
      </div>
    </header>
  );
}