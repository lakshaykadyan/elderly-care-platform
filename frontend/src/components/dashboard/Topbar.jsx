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
        <button
          onClick={toggleSidebar}
          className="hamburger-menu-btn"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            marginRight: "8px",
            padding: "6px",
            borderRadius: "8px",
            transition: "background 0.2s ease",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          ☰
        </button>
        <h2 style={{
          fontSize: "clamp(16px, 2.5vw, 22px)",
          fontWeight: "600",
          color: "var(--text-primary)",
          margin: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "140px",
        }}>
          Welcome 👋 {userName}
        </h2>
      </div>
      <div className="topbar-right" style={{
        display: "flex",
        alignItems: "center",
        gap: "clamp(8px, 1.5vw, 18px)",
        flexShrink: 0,
      }}>
        <ThemeToggle />
        <NotificationPanel />
        <ProfileDropdown />
      </div>
    </header>
  );
}