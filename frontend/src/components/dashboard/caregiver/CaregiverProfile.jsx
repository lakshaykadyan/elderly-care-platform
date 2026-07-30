import { useEffect, useState } from "react";
import API from "../../../services/api";
import { showSuccess, showError } from "../../../utils/toast";
import ProfileForm from "./profile/ProfileForm";
import LoadingProfile from "./profile/LoadingProfile";
import EmptyProfile from "./profile/EmptyProfile";

export default function CaregiverProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    age: "",
    qualification: "",
    specialization: "",
    experience: "",
    serviceArea: "",
    address: "",
    bio: "",
    availability: "available",
  });

  useEffect(() => {
    const dark = localStorage.getItem("theme") === "dark";
    setIsDark(dark);
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/caregiver/profile");
      const caregiver = res.data.caregiver;
      setProfile({
        name: caregiver.name || "",
        email: caregiver.email || "",
        phone: caregiver.caregiverProfile?.phone || "",
        gender: caregiver.caregiverProfile?.gender || "",
        age: caregiver.caregiverProfile?.age || "",
        qualification: caregiver.caregiverProfile?.qualification || "",
        specialization: caregiver.caregiverProfile?.specialization || "",
        experience: caregiver.caregiverProfile?.experience || "",
        serviceArea: caregiver.caregiverProfile?.serviceArea || "",
        address: caregiver.caregiverProfile?.address || "",
        bio: caregiver.caregiverProfile?.bio || "",
        availability: caregiver.caregiverProfile?.availability || "available",
      });
    } catch (err) {
      console.log(err);
      showError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    if (saving) return;
    try {
      setSaving(true);
      await API.put("/caregiver/profile", {
        phone: profile.phone,
        gender: profile.gender,
        age: profile.age,
        qualification: profile.qualification,
        specialization: profile.specialization,
        experience: profile.experience,
        serviceArea: profile.serviceArea,
        address: profile.address,
        bio: profile.bio,
      });
      showSuccess("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      showError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingProfile />;
  if (!profile.name && !profile.email) return <EmptyProfile />;

  return (
    <div
      style={{
        padding: "32px 28px",
        background: isDark ? "#1e293b" : "#ffffff",
        borderRadius: "24px",
        border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
        boxShadow: "0 8px 32px -8px rgba(0,0,0,0.06)",
        overflow: "hidden",
      }}
    >
      <ProfileForm
        profile={profile}
        handleChange={handleChange}
        saveProfile={saveProfile}
        saving={saving}
      />
    </div>
  );
}