import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, LogOut } from "lucide-react";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import "./ProfileDropdown.css";

export default function ProfileDropdown() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("elderlyUser") || "null");
  const userName = user?.name || user?.fullName || user?.username || "User";
  const role = user?.role || "User";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("elderlyUser");
    localStorage.removeItem("role");
    window.location.replace("/");
  };

  return (
    <>
      <style>{`
        .profile-dropdown .logout-btn {
          color: #ef4444 !important;
          font-weight: 600 !important;
          opacity: 1 !important;
        }
        .profile-dropdown .logout-btn:hover {
          color: #f87171 !important;
          background: rgba(239, 68, 68, 0.05) !important;
        }
        [data-theme="dark"] .profile-dropdown .logout-btn {
          color: #f87171 !important;
          opacity: 1 !important;
        }
        [data-theme="dark"] .profile-dropdown .logout-btn:hover {
          color: #fca5a5 !important;
        }
      `}</style>

      <div className="profile-dropdown" ref={dropdownRef}>
        <div className="profile-avatar-btn" onClick={() => setOpen(!open)}>
          {userName.charAt(0).toUpperCase()}
        </div>

        {open && (
          <div className="profile-dropdown-menu">
            <div className="profile-dropdown-header">
              <div className="profile-avatar-large">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4>{userName}</h4>
                <p>{role}</p>
              </div>
            </div>

            <hr />

            <button
              className="profile-menu-btn"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
            >
              <User size={16} style={{ display: "inline-block", marginRight: "10px" }} />
              My Profile
            </button>

            <button
              className="profile-menu-btn"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
            >
              <Lock size={16} style={{ display: "inline-block", marginRight: "10px" }} />
              Change Password
            </button>

            <hr />

            <button
              className="profile-menu-btn logout-btn"
              onClick={() => {
                setOpen(false);
                setShowLogout(true);
              }}
            >
              <LogOut size={16} style={{ display: "inline-block", marginRight: "10px" }} />
              Logout
            </button>
          </div>
        )}
      </div>

      {showLogout && (
        <ConfirmLogoutModal
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}