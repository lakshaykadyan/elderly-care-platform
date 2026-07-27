import { useEffect, useState } from "react";
import { getPatientProfile, savePatientProfile } from "../../../hooks/usePatient";
import { showSuccess, showError } from "../../../utils/toast";
import ProfileForm from "./profile/ProfileForm";
import LoadingProfile from "./profile/LoadingProfile";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    patientName: "",
    patientAge: "",
    medicalCondition: "",
    patientAddress: "",
    emergencyContact: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getPatientProfile();
      if (data?.profile) {
        setProfile({
          patientName: data.profile.patientName || "",
          patientAge: data.profile.patientAge || "",
          medicalCondition: data.profile.medicalCondition || "",
          patientAddress: data.profile.patientAddress || "",
          emergencyContact: data.profile.emergencyContact || "",
        });
      }
    } catch (error) {
      console.log(error);
      showError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (saving) return;
    try {
      setSaving(true);
      const data = await savePatientProfile(profile);
      showSuccess(data.message);
    } catch (error) {
      console.log(error);
      showError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingProfile />;

  const hasProfile = profile.patientName || profile.patientAge || profile.medicalCondition;

  return (
    <div style={{
      padding: "32px 28px",
      background: "var(--bg-card)",
      borderRadius: "24px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
    }}>
      {/* Avatar + Title */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "28px" }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "36px",
          color: "#fff",
          boxShadow: "0 8px 24px rgba(79,70,229,0.3)",
          marginBottom: "16px",
        }}>
          👤
        </div>
        <h2 style={{ fontSize: "26px", fontWeight: "700", color: "var(--text-primary)", margin: 0, letterSpacing: "-0.5px" }}>
          {hasProfile ? "Patient Profile" : "Create Profile"}
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px", margin: "6px 0 0 0" }}>
          {hasProfile ? "Update your personal information" : "Fill in your details to get started"}
        </p>
      </div>

      {/* Always show form, no empty state blocking */}
      <ProfileForm profile={profile} setProfile={setProfile} handleSave={handleSave} saving={saving} />
    </div>
  );
}