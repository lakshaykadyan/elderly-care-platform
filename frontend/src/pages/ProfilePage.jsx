import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProfile from "../components/dashboard/user/Profile";
import CaregiverProfile from "../components/dashboard/caregiver/CaregiverProfile";
import AdminProfile from "../components/dashboard/admin/AdminProfile";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "var(--text-secondary)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role?.toLowerCase();

  // ✅ Back button component
  const BackButton = () => (
    <button
      onClick={() => navigate(-1)}
      style={{
        display: isMobile ? "flex" : "none",
        background: "none",
        border: "none",
        fontSize: "28px",
        cursor: "pointer",
        color: "var(--text-primary)",
        padding: "8px 12px",
        position: "absolute",
        top: "16px",
        left: "16px",
        zIndex: 10,
        borderRadius: "8px",
        transition: "background 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      ←
    </button>
  );

  // Admin -> AdminProfile
  if (role === "admin") {
    return (
      <div style={{ position: "relative" }}>
        <BackButton />
        <AdminProfile />
      </div>
    );
  }

  // Caregiver -> CaregiverProfile
  if (role === "caregiver") {
    return (
      <div style={{ position: "relative" }}>
        <BackButton />
        <CaregiverProfile />
      </div>
    );
  }

  // Default: User Profile
  return (
    <div style={{ position: "relative" }}>
      <BackButton />
      <UserProfile />
    </div>
  );
}