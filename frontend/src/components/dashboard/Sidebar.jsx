import { useState } from "react";
import { X } from "lucide-react"; // ✅ Import X icon
import ConfirmLogoutModal from "../common/profile/ConfirmLogoutModal";
import { useSidebar } from "../../context/SidebarContext";

export default function Sidebar({
  activePage,
  setActivePage,
  role = "user",
}) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isOpen, closeSidebar } = useSidebar();

  const getMenuClass = (page) => {
    return activePage === page ? "menu-btn active" : "menu-btn";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("elderlyUser");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <>
      <style>{`
        .logout-btn-sidebar {
          color: #ef4444 !important;
          border-top: 1px solid var(--border-color, #333) !important;
          padding-top: 20px !important;
          margin-top: 10px !important;
          font-weight: 600 !important;
          opacity: 1 !important;
          transition: color 0.2s ease !important;
          width: 100% !important;
          text-align: left !important;
          background: transparent !important;
          border-left: none !important;
          border-right: none !important;
          border-bottom: none !important;
          border-radius: 12px !important;
          padding: 14px 16px !important;
          font-size: 16px !important;
          cursor: pointer !important;
        }
        .logout-btn-sidebar:hover {
          color: #f87171 !important;
        }
        [data-theme="dark"] .logout-btn-sidebar {
          color: #f87171 !important;
          opacity: 1 !important;
        }
        [data-theme="dark"] .logout-btn-sidebar:hover {
          color: #fca5a5 !important;
        }

        /* ===== Mobile Sidebar Overlay ===== */
        @media (max-width: 768px) {
          .sidebar-mobile-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
          }
          .sidebar-mobile-overlay.active {
            opacity: 1;
            visibility: visible;
          }
          .sidebar-mobile {
            position: fixed;
            top: 0;
            left: -280px;
            width: 280px;
            height: 100vh;
            background: #1d2433;
            z-index: 1000;
            transition: left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
            padding: 30px 20px;
            overflow-y: auto;
          }
          .sidebar-mobile.open {
            left: 0;
          }
          .hamburger-menu-btn {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .sidebar-mobile-overlay {
            display: none !important;
          }
          .sidebar-mobile {
            display: none !important;
          }
          .sidebar-desktop {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .sidebar-desktop {
            display: none !important;
          }
        }
      `}</style>

      {/* ✅ Desktop Sidebar */}
      <aside className="sidebar sidebar-desktop">
        <div className="logo">
          <h2>ElderlyCare</h2>
        </div>
        <nav className="menu">
          {renderMenuButtons(getMenuClass, activePage, setActivePage, role)}
          <div style={{ marginTop: "auto", paddingTop: "20px" }}>
            <button className="logout-btn-sidebar" onClick={() => setShowLogoutModal(true)}>
              🚪 Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* ✅ Mobile Overlay */}
      <div
        className={`sidebar-mobile-overlay ${isOpen ? "active" : ""}`}
        onClick={closeSidebar}
      />

      {/* ✅ Mobile Sidebar (Premium Close Button) */}
      <aside className={`sidebar sidebar-mobile ${isOpen ? "open" : ""}`}>
        {/* ✅ Logo + Close Button in Flex Row */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}>
          <div className="logo" style={{ marginBottom: 0, textAlign: "left" }}>
            <h2>ElderlyCare</h2>
          </div>
          <button
            onClick={closeSidebar}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              border: "none",
              color: "#fff",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        <nav className="menu">
          {renderMenuButtons(getMenuClass, activePage, setActivePage, role)}
          <div style={{ marginTop: "auto", paddingTop: "20px" }}>
            <button className="logout-btn-sidebar" onClick={() => setShowLogoutModal(true)}>
              🚪 Logout
            </button>
          </div>
        </nav>
      </aside>

      {showLogoutModal && (
        <ConfirmLogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
}

// ✅ Helper function to avoid repetition
function renderMenuButtons(getMenuClass, activePage, setActivePage, role) {
  const buttons = [];

  if (role === "user") {
    buttons.push(
      { key: "profile", label: "👤 My Profile", page: "profile" },
      { key: "request", label: "🩺 Book Service", page: "request" },
      { key: "bookings", label: "📅 My Bookings", page: "bookings" },
      { key: "medical", label: "📂 Medical Records", page: "medical" },
      { key: "contacts", label: "👨‍👩‍👧 Emergency Contacts", page: "contacts" },
      { key: "notifications", label: "🔔 Notifications", page: "notifications" },
      { key: "complaints", label: "⚠ Complaints", page: "complaints" },
      { key: "settings", label: "⚙ Settings", page: "settings", disabled: true }
    );
  } else if (role === "admin") {
    buttons.push(
      { key: "dashboard", label: "📊 Dashboard", page: "dashboard" },
      { key: "users", label: "👥 Manage Users", page: "users" },
      { key: "caregivers", label: "🧑‍⚕️ Manage Caregivers", page: "caregivers" },
      { key: "services", label: "📅 Manage Services", page: "services" },
      { key: "complaints", label: "⚠ Manage Complaints", page: "complaints" },
      { key: "analytics", label: "📈 Analytics", page: "analytics" }
    );
  } else if (role === "caregiver") {
    buttons.push(
      { key: "dashboard", label: "🏠 Dashboard", page: "dashboard" },
      { key: "profile", label: "👤 My Profile", page: "profile" },
      { key: "services", label: "📋 Assigned Services", page: "services" },
      { key: "availability", label: "🟢 Availability", page: "availability" },
      { key: "notifications", label: "🔔 Notifications", page: "notifications" }
    );
  }

  return buttons.map((btn) => (
    <button
      key={btn.key}
      type="button"
      className={btn.disabled ? "menu-btn" : getMenuClass(btn.page)}
      onClick={() => !btn.disabled && setActivePage(btn.page)}
      disabled={btn.disabled}
    >
      {btn.label}
    </button>
  ));
}