import NotificationPanel from "../common/NotificationPanel";
import ProfileDropdown from "../common/profile/ProfileDropdown";
import { useAuth } from "../../context/AuthContext";
import { useSidebar } from "../../context/SidebarContext";
import ThemeToggle from "../common/ThemeToggle"; 

export default function Topbar() {
  const { user } = useAuth();
  const { toggleSidebar } = useSidebar();

  const userName = user?.name || user?.fullName || "Guest";

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Hamburger Button for Mobile */}
        <button
          onClick={toggleSidebar}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            marginRight: "12px",
            padding: "8px",
            borderRadius: "8px",
            transition: "background 0.2s ease",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="hamburger-menu-btn"
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          ☰
        </button>
        <h2 style={{ fontSize: "20px", fontWeight: "600", color: "var(--text-primary)", margin: 0 }}>
          Welcome 👋 {userName}
        </h2>
      </div>
      <div className="topbar-right">
        <ThemeToggle /> 
        <NotificationPanel />
        <ProfileDropdown />
      </div>
    </header>
  );
}