import API from "../services/api";

// ========================= Get Patient Profile =========================

export const getPatientProfile = async () => {

  const response = await API.get("/patient-profile");

  return response.data;

};

// ========================= Save Patient Profile =========================

export const savePatientProfile = async (profileData) => {

  const response = await API.post(
    "/patient-profile",
    profileData
  );

  return response.data;

};