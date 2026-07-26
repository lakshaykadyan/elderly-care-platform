import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import UserProfile from "../components/dashboard/user/Profile";
import CaregiverProfile from "../components/dashboard/caregiver/CaregiverProfile";
import AdminProfile from "../components/dashboard/admin/AdminProfile";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: "var(--text-secondary)",
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role?.toLowerCase();

  // Admin -> AdminProfile
  if (role === "admin") {
    return <AdminProfile />;
  }

  // Caregiver -> CaregiverProfile
  if (role === "caregiver") {
    return <CaregiverProfile />;
  }

  // Default: User Profile
  return <UserProfile />;
}