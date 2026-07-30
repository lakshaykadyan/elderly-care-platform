import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { showSuccess, showError } from "../../../utils/toast";
import { Mail, User, Lock, Shield, KeyRound, AlertCircle } from "lucide-react";

export default function AdminProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Force dark/light mode from localStorage on mount
  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    setIsDark(dark);
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return showError("New passwords do not match");
    }
    if (passwordData.newPassword.length < 6) {
      return showError("Password must be at least 6 characters");
    }
    showSuccess("Password changed successfully (Demo)");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsEditing(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      padding: "40px 20px",
      background: "var(--bg-body)",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    }}>
      <div style={{
        maxWidth: "750px",
        width: "100%",
        margin: "0 auto",
      }}>
        <div style={{
          background: "var(--bg-card)",
          borderRadius: "24px",
          padding: "32px 28px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #4f46e5, #a855f7, #ec4899, #4f46e5)",
            backgroundSize: "300% 100%",
            animation: "gradientMove 4s ease infinite",
          }} />

          {/* ===== AVATAR + HEADER ===== */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "32px",
          }}>
            <div style={{
              position: "relative",
              marginBottom: "16px",
            }}>
              <div style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #a855f7)",
                opacity: 0.15,
                filter: "blur(16px)",
              }} />
              <div style={{
                width: "88px",
                height: "88px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                color: "#fff",
                boxShadow: "0 12px 32px rgba(79,70,229,0.35)",
                position: "relative",
                zIndex: 1,
              }}>
                <User size={40} />
              </div>
            </div>

            <h2 style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "var(--text-primary)",
              margin: 0,
              letterSpacing: "-0.5px",
            }}>
              {user?.name || "Administrator"}
            </h2>

            <div style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "10px",
            }}>
              <span style={{
                padding: "4px 16px",
                borderRadius: "30px",
                background: "rgba(239,68,68,0.08)",
                color: "#ef4444",
                fontSize: "12px",
                fontWeight: "600",
                border: "1px solid rgba(239,68,68,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                <Shield size={14} />
                Admin
              </span>
              <span style={{
                padding: "4px 16px",
                borderRadius: "30px",
                background: "rgba(99,102,241,0.08)",
                color: "#a78bfa",
                fontSize: "12px",
                fontWeight: "600",
                border: "1px solid rgba(99,102,241,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                <Shield size={14} />
                Super Admin
              </span>
            </div>
          </div>

          {/* ===== DETAILS GRID ===== */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}>
            <div style={{
              padding: "16px 20px",
              background: "var(--bg-body)",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
              e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <span style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--text-muted)",
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                <User size={14} />
                Full Name
              </span>
              <span style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "var(--text-primary)",
                display: "block",
              }}>
                {user?.name || "N/A"}
              </span>
            </div>

            <div style={{
              padding: "16px 20px",
              background: "var(--bg-body)",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
              e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <span style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--text-muted)",
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                <Mail size={14} />
                Email
              </span>
              <span style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "var(--text-primary)",
                display: "block",
              }}>
                {user?.email || "N/A"}
              </span>
            </div>

            <div style={{
              padding: "16px 20px",
              background: "var(--bg-body)",
              borderRadius: "16px",
              border: "1px solid var(--border-color)",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)";
              e.currentTarget.style.boxShadow = "0 8px 24px -6px rgba(0,0,0,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border-color)";
              e.currentTarget.style.boxShadow = "none";
            }}>
              <span style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "var(--text-muted)",
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                <Shield size={14} />
                Role
              </span>
              <span style={{
                fontSize: "17px",
                fontWeight: "700",
                color: "#ef4444",
                display: "block",
              }}>
                <Shield size={16} style={{ display: "inline", marginRight: "4px" }} />
                Administrator
              </span>
            </div>
          </div>

          {/* ===== SECURITY SECTION ===== */}
          <div style={{
            background: "var(--bg-body)",
            borderRadius: "20px",
            padding: "24px 24px",
            border: "1px solid var(--border-color)",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "var(--text-primary)",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <Lock size={20} />
                Security
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: "8px 24px",
                    borderRadius: "40px",
                    border: "none",
                    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    boxShadow: "0 4px 14px rgba(79,70,229,0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.04)";
                    e.target.style.boxShadow = "0 8px 25px rgba(79,70,229,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 4px 14px rgba(79,70,229,0.3)";
                  }}
                >
                  <KeyRound size={16} style={{ display: "inline", marginRight: "6px" }} />
                  Change Password
                </button>
              )}
            </div>

            {isEditing && (
              <div style={{
                padding: "20px",
                background: "var(--bg-card)",
                borderRadius: "16px",
                border: "1px solid var(--border-color)",
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}>
                  <div>
                    <label style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--text-secondary)",
                      display: "block",
                      marginBottom: "6px",
                    }}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter current password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-card)",
                        color: "var(--text-primary)",
                        fontSize: "15px",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
                      onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--text-secondary)",
                      display: "block",
                      marginBottom: "6px",
                    }}>
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-card)",
                        color: "var(--text-primary)",
                        fontSize: "15px",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
                      onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
                    />
                  </div>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <label style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--text-secondary)",
                      display: "block",
                      marginBottom: "6px",
                    }}>
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "12px",
                        border: "1px solid var(--border-color)",
                        background: "var(--bg-card)",
                        color: "var(--text-primary)",
                        fontSize: "15px",
                        outline: "none",
                        transition: "all 0.3s ease",
                      }}
                      onFocus={(e) => { e.target.borderColor = "#4f46e5"; e.target.boxShadow = "0 0 0 4px rgba(79,70,229,0.08)"; }}
                      onBlur={(e) => { e.target.borderColor = "var(--border-color)"; e.target.boxShadow = "none"; }}
                    />
                  </div>
                </div>
                <div style={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "20px",
                  justifyContent: "flex-end",
                }}>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    }}
                    style={{
                      padding: "10px 24px",
                      borderRadius: "30px",
                      border: "1px solid var(--border-color)",
                      background: "transparent",
                      color: "var(--text-secondary)",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePasswordChange}
                    style={{
                      padding: "10px 28px",
                      borderRadius: "30px",
                      border: "none",
                      background: "linear-gradient(135deg, #22c55e, #16a34a)",
                      color: "#fff",
                      fontWeight: "600",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      boxShadow: "0 4px 14px rgba(34,197,94,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.04)";
                      e.target.style.boxShadow = "0 8px 25px rgba(34,197,94,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 4px 14px rgba(34,197,94,0.3)";
                    }}
                  >
                    <KeyRound size={16} style={{ display: "inline", marginRight: "6px" }} />
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ===== FOOTER NOTE ===== */}
          <div style={{
            marginTop: "24px",
            padding: "14px 18px",
            background: "rgba(99,102,241,0.04)",
            borderRadius: "14px",
            border: "1px solid rgba(99,102,241,0.06)",
            textAlign: "center",
          }}>
            <p style={{
              color: "var(--text-muted)",
              fontSize: "13px",
              margin: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}>
              <AlertCircle size={16} />
              You have full administrative access to the platform.
            </p>
          </div>
        </div>

        <style>{`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </div>
  );
}